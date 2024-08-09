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
import { selectData } from 'src/app/redux/selectors/data.selector';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { CustomCard, Page } from 'src/app/redux/state.model';
import { selectIsFavorite } from 'src/app/redux/selectors/favorites.selector';
import { addFavorite, removeFavorite } from 'src/app/redux/actions/favorites.actions';
import { selectCustomCard } from 'src/app/redux/selectors/custom-card.selector';
import { CardType } from '@shared/components/cards/types';
import { removeCustomCard } from 'src/app/redux/actions/custom-card.actions';
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

      if (!this.item.statistics) {
        this.apiService.getVideo(id).subscribe((data) => {
          this.item = {
            ...this.item,
            statistics: data.items[0].statistics,
          } as VideoCard;
        });
      }
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

  public fallback =
    'data:image/png;base64,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';

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
