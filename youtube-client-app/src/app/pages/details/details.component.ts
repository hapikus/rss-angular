import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, Observable, Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Statistics, VideoCard } from '@models/video-card.model';
import { NFormatterPipe } from '@shared/components/statistics/pipes/n-formatter.pipe';
import { StatisticsComponent } from '@shared/components/statistics/statistics.component';
import { ApiService } from '@services/api/api.service';
import { Store } from '@ngrx/store';
import { selectData } from 'src/app/redux/selectors/videos.selector';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { CustomCard, Page } from 'src/app/redux/state.model';
import { selectIsFavorite } from 'src/app/redux/selectors/favorites.selector';
import { addFavorite, removeFavorite } from 'src/app/redux/actions/favorites.actions';
import { selectCustomCard } from 'src/app/redux/selectors/custom-card.selector';
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
  public dataSubs?: Subscription;
  public isFavoriteSubs?: Subscription;
  public customCardSub?: Subscription;

  public data$ = this.store.select(selectData);
  public dataCurrent: VideoCard[] = [];

  public isFavorite$ = this.store.select(
    selectIsFavorite(this.item?.id.videoId ?? ''),
  );
  public isFavoriteCurrent = false;

  public item?: VideoCard;

  public customCardCurrent?: CustomCard;

  public isScreenSmall$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1020px)'])
    .pipe(map((state) => state.matches));

  public id: string = '';
  public statistics?: Statistics = this.item?.statistics;

  public cardTypeEnum = CardType;
  public cardType = CardType.YouTube;

  public rowsConst = ROWS;

  constructor(
    private activateRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,
    private store: Store,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Details }));
    const { id } = this.activateRoute.snapshot.params;
    this.id = id;

    this.dataSubs = this.data$.subscribe((data) => {
      this.dataCurrent = data;
    });

    const item = this.dataCurrent.find(
      (videoCard) => videoCard.id.videoId === id,
    );

    const customCard = Number.isFinite(+id)
      ? this.store.select(selectCustomCard(+id))
      : null;

    if (!item && !customCard) {
      this.router.navigate(['/not-found']);
      return;
    }

    if (item) {
      this.cardType = CardType.YouTube;
      this.item = item;
      this.isFavorite$ = this.store.select(
        selectIsFavorite(this.item.id.videoId),
      );
      this.isFavoriteSubs = this.isFavorite$.subscribe((flag) => {
        this.isFavoriteCurrent = flag;
      });
    }

    if (customCard) {
      this.cardType = CardType.CustomCard;
      this.customCardSub = customCard.subscribe((card) => {
        this.customCardCurrent = card;
      });
    }

    if (!this.item && !this.customCardCurrent) {
      this.router.navigate(['/not-found']);
    }
  }

  public get title(): string {
    return this.item?.snippet?.title ?? this.customCardCurrent?.title ?? '';
  }

  public get description(): string {
    return this.item?.snippet.description ?? this.customCardCurrent?.description ?? '';
  }

  public get publishDate(): Date {
    return (
      this.item?.snippet.publishedAt ??
      this.customCardCurrent?.createDate ??
      new Date()
    );
  }

  public get previewImg(): string {
    const result = {
      width: 0,
      url: '',
    };

    switch (this.cardType) {
      case CardType.YouTube:
        if (!this.item) {
          return '';
        }
        Array.from(Object.values(this.item.snippet.thumbnails)).forEach((item) => {
          const { width, url } = item;
          if (+width > result.width) {
            result.width = width;
            result.url = url;
          }
        });
        return result.url;
      default:
        if (!this.customCardCurrent?.previewImage) {
          return '';
        }
        return this.customCardCurrent?.previewImage;
    }
  }

  public fallback = environment.fallbackImage;

  public addFavorite() {
    if (this.item?.id.videoId) {
      this.store.dispatch(addFavorite({
        favoriteCard:
          {
            id: this.id,
            title: this.title ?? '',
            video: '',
            description: this.description ?? '',
            previewImage: this.previewImg ?? '',
            createDate: this.publishDate!,
            statistics: this.statistics,
          },
        }));
    }
  }

  public removeFavorite() {
    if (this.item?.id.videoId) {
      this.store.dispatch(removeFavorite({ id: this.item?.id.videoId }));
    }
  }

  public deleteCustomCard() {
    this.store.dispatch(removeCustomCard({ index: +(this.id ?? 0) }));
    this.router.navigate(['/']);
  }
}
