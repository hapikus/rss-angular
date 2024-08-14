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
import { CardType } from '@shared/components/cards/types';
import { environment } from 'src/environments/environment';
import { CardActionComponent } from '@shared/components/card-action/card-action.component';
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
    CardActionComponent,
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

  public get previewUrl(): string {
    return this.card?.previewUrl ?? '';
  }

  public fallback = environment.fallbackImage;
}
