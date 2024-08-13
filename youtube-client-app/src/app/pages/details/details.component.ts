import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, Observable, Subscription, take } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Card } from '@models/video-card.model';
import { NFormatterPipe } from '@shared/components/statistics/pipes/n-formatter.pipe';
import { StatisticsComponent } from '@shared/components/statistics/statistics.component';
import { Store } from '@ngrx/store';
import { selectItemForDetails } from 'src/app/redux/selectors/videos.selector';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { Page } from 'src/app/redux/state.model';
import { selectIsFavorite } from 'src/app/redux/selectors/favorites.selector';
import { addFavorite, removeFavorite } from 'src/app/redux/actions/favorites.actions';
import { CardType } from '@shared/components/cards/types';
import { removeCustomCard } from 'src/app/redux/actions/custom-card.actions';
import { environment } from 'src/environments/environment';
import { DFormatterPipe } from './pipes/d-formatter.pipe';

const ROWS = {
  bigScreen: 14,
  smallScreen: 99,
};

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NzImageModule,
    NFormatterPipe,
    NzTypographyModule,
    DFormatterPipe,
    StatisticsComponent,
    CommonModule,
    RouterLink,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  public isFavoriteSubs?: Subscription;
  public isFavorite$ = this.store.select(
    selectIsFavorite(this.card?.id ?? ''),
  );
  public isFavoriteCurrent = false;

  public cardSub?: Subscription;
  public card?: Card | null;

  public isScreenSmall$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1020px)'])
    .pipe(map((state) => state.matches));

  public cardTypeEnum = CardType;
  public cardType = CardType.YouTube;
  public rowsConst = ROWS;

  constructor(
    private activateRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Details }));
    const { id } = this.activateRoute.snapshot.params;

    if (id === undefined) {
      this.router.navigate(['/not-found']);
      return;
    }

    const card$: Observable<Card | null> = this.store.select(selectItemForDetails(id));

    this.cardSub = card$.pipe(
      take(1),
    ).subscribe((card) => {
      this.card = card;
    });

    if (
      this.card?.cardType === CardType.YouTube ||
      this.card?.cardType === CardType.FavoriteCard
    ) {
      this.cardType = this.card?.cardType;
      this.isFavorite$ = this.store.select(
        selectIsFavorite(this.card?.id),
      );
      this.isFavoriteSubs = this.isFavorite$.subscribe((flag) => {
        this.isFavoriteCurrent = flag;
      });
    }
  }

  public get title(): string {
    return this.card?.title ?? '';
  }

  public get description(): string {
    return this.card?.description ?? '';
  }

  public get publishDate(): Date {
    return this.card?.publishDate ?? new Date();
  }

  public get previewImg(): string {
    return this.card?.previewUrl ?? '';
  }

  public fallback = environment.fallbackImage;

  public addFavorite() {
    if (this.card?.id) {
      this.store.dispatch(addFavorite({
        favoriteCard:
          {
            id: this.card.id,
            title: this.card.title ?? '',
            video: '',
            description: this.card.description ?? '',
            previewImage: this.card.previewUrl ?? '',
            createDate: this.card.publishDate!,
            statistics: this.card.statistics,
          },
        }));
    }
  }

  public removeFavorite() {
    if (this.card?.id) {
      this.store.dispatch(removeFavorite({ id: this.card?.id }));
    }
  }

  public deleteCustomCard() {
    this.store.dispatch(removeCustomCard({ index: +(this.card?.id ?? 0) }));
    this.router.navigate(['/']);
  }
}
