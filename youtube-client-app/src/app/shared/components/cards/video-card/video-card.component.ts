import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Statistics } from '@models/video-card.model';
import { NFormatterPipe } from '@shared/components/statistics/pipes/n-formatter.pipe';
import { StatisticsComponent } from '@shared/components/statistics/statistics.component';
import { Subscription } from 'rxjs';
import { selectIsFavorite } from 'src/app/redux/selectors/favorites.selector';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite } from 'src/app/redux/actions/favorites.actions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';
import { removeCustomCard } from 'src/app/redux/actions/custom-card.actions';
import { environment } from 'src/environments/environment';
import { CardActionComponent } from '@shared/components/card-action/card-action.component';
import { VideoCardBorderDirective } from './directives/video-card-border.directive';
import { CardType } from '../types';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [
    NzCardModule,
    NzTypographyModule,
    NzStatisticModule,
    VideoCardBorderDirective,
    NFormatterPipe,
    RouterLink,
    NzButtonModule,
    StatisticsComponent,
    NzIconModule,
    CommonModule,
    NzImageModule,
    CardActionComponent,
  ],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public title: string = '';
  @Input() public statistics?: Statistics;
  @Input() public previewUrl?: string = '';
  @Input() public description?: string = '';
  @Input() public publishDate: Date = new Date();
  @Input() public id?: string;
  @Input() public cardType?: CardType;

  public cardTypeEnum = CardType;

  public fallback = environment.fallbackImage;

  public isFavoriteSubs?: Subscription;
  public isFavorite$ = this.store.select(selectIsFavorite(this.id ?? ''));
  public isFavoriteCurrent = false;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    if (this.id) {
      this.subscribeToFavorite();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && !changes['id'].firstChange) {
      this.subscribeToFavorite();
    }
  }

  public ngOnDestroy(): void {
    this.isFavoriteSubs?.unsubscribe();
  }

  private subscribeToFavorite(): void {
    if (this.isFavoriteSubs) {
      this.isFavoriteSubs.unsubscribe();
    }

    if (this.id) {
      this.isFavorite$ = this.store.select(selectIsFavorite(this.id));
      this.isFavoriteSubs = this.isFavorite$.subscribe((flag) => {
        this.isFavoriteCurrent = flag;
      });
    }
  }

  public addFavorite() {
    if (this.id) {
      this.store.dispatch(
        addFavorite({
          favoriteCard: {
            id: this.id,
            title: this.title ?? '',
            video: '',
            description: this.description ?? '',
            previewImage: this.previewUrl ?? '',
            createDate: this.publishDate ?? new Date(),
            statistics: this.statistics,
          },
        }),
      );
    }
  }

  public removeFavorite() {
    if (this.id) {
      this.store.dispatch(removeFavorite({ id: this.id }));
    }
  }

  public deleteCustomCard() {
    this.store.dispatch(removeCustomCard({ index: +(this.id ?? 0) }));
  }

  public clickHandle() {
    switch (this.cardType) {
      case CardType.CustomCard:
        this.deleteCustomCard();
        break;
      case CardType.FavoriteCard:
      case CardType.YouTube:
        if (this.isFavoriteCurrent) {
          this.removeFavorite();
          break;
        }
        this.addFavorite();
        break;
      default:
        break;
    }
  }
}
