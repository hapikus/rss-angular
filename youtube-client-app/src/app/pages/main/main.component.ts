import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoCard } from '@models/video-card.model';
import { ItemsService } from '@services/items/items.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSortDirection } from 'src/app/redux/selectors/sort-direction.selector';
import { selectSortType } from 'src/app/redux/selectors/sort-type.selector';
import { selectData } from 'src/app/redux/selectors/data.selector';
import { CustomCard, Page, PageTokenKey, PageTokens, SortDirection, SortType } from 'src/app/redux/state.model';
import { selectSortInput } from 'src/app/redux/selectors/sort-input.selector';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '@shared/components/cards/cards.component';
import { selectCustomCards } from 'src/app/redux/selectors/custom-card.selector';
import { selectPageTokens } from 'src/app/redux/selectors/page-token.selector';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ApiService } from '@services/api/api.service';
import { selectSearchInput } from 'src/app/redux/selectors/search-input.selector';
import { SearchResponse } from '@models/search.model';
import { dataFetch, dataUpdate } from 'src/app/redux/actions/data.actions';
import { addPageToken } from 'src/app/redux/actions/page-token.actions';
import { selectPageNumber } from 'src/app/redux/selectors/page-number.selector';
import { decreasePageNumber, increasePageNumber } from 'src/app/redux/actions/page-number.actions';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardsComponent,
    CommonModule,
    NzButtonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  public dataSubs?: Subscription;
  public data$ = this.store.select(selectData);
  public dataCurrent: VideoCard[] = [];

  public searchInputSubs?: Subscription;
  public searchInput$ = this.store.select(selectSearchInput);
  public searchInputCurrent = '';

  public customCardsSubs?: Subscription;
  public customCards$ = this.store.select(selectCustomCards);
  public customCardsCurrent: CustomCard[] = [];

  public sortTypeSubs?: Subscription;
  public sortType$ = this.store.select(selectSortType);
  public sortTypeCurrent: SortType = SortType.Date;

  public sortDirectionSubs?: Subscription;
  public sortDirection$ = this.store.select(selectSortDirection);
  public sortDirectionCurrent = SortDirection.ASC;

  public sortInputSubs?: Subscription;
  public sortInput$ = this.store.select(selectSortInput);
  public sortInputCurrent = '';

  public pageTokensSubs?: Subscription;
  public pageTokens$ = this.store.select(selectPageTokens);
  public pageTokensCurrent = {} as PageTokens;
  public pageTokenKeyEnum = PageTokenKey;

  public pageNumberSubs?: Subscription;
  public pageNumber$ = this.store.select(selectPageNumber);
  public pageNumberCurrent = 1;

  public get items(): VideoCard[] {
    const sortedItems = this.itemsService.getSortedItems({
      cards: this.dataCurrent,
      sortType: this.sortTypeCurrent,
      sortDirection: this.sortDirectionCurrent,
      sortInput: this.sortInputCurrent,
    });
    return sortedItems;
  }

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Main }));
    this.dataSubs = this.data$.subscribe((data) => {
      this.dataCurrent = data;
    });
    this.sortTypeSubs = this.sortType$.subscribe((type) => {
      this.sortTypeCurrent = type;
    });
    this.sortDirectionSubs = this.sortDirection$.subscribe((direction) => {
      this.sortDirectionCurrent = direction;
    });
    this.sortInputSubs = this.sortInput$.subscribe((input) => {
      this.sortInputCurrent = input;
    });
    this.customCardsSubs = this.customCards$.subscribe((cards) => {
      this.customCardsCurrent = cards;
    });
    this.pageTokensSubs = this.pageTokens$.subscribe((tokens) => {
      this.pageTokensCurrent = tokens;
    });
    this.searchInputSubs = this.searchInput$.subscribe((input) => {
      this.searchInputCurrent = input;
    });
    this.pageNumberSubs = this.pageNumber$.subscribe((pageNumber) => {
      this.pageNumberCurrent = pageNumber;
    });
  }

  public ngOnDestroy(): void {
    this.dataSubs?.unsubscribe();
    this.sortTypeSubs?.unsubscribe();
    this.sortDirectionSubs?.unsubscribe();
    this.sortInputSubs?.unsubscribe();
    this.customCardsSubs?.unsubscribe();
    this.pageTokensSubs?.unsubscribe();
    this.searchInputSubs?.unsubscribe();
  }

  public pageLoad(pageTokenKey: PageTokenKey): void {
    switch (pageTokenKey) {
      case PageTokenKey.Next:
        this.store.dispatch(increasePageNumber());
        break;
      default:
        this.store.dispatch(decreasePageNumber());
        break;
    }
    this.apiService
      .getVideos(this.searchInputCurrent, '8', this.pageTokensCurrent[pageTokenKey])
      .subscribe((res: SearchResponse) => {
        if (res) {
          this.store.dispatch(dataFetch({ videoCards: res.items }));
        }

        res.items.forEach((video) => {
          this.apiService
            .getVideoWithDetails(video.id.videoId)
            .subscribe((detailsRes: SearchResponse) => {
              if (detailsRes && detailsRes.items.length > 0) {
                const videoDetail = detailsRes.items[0];
                this.store.dispatch(dataUpdate({ videoCard: videoDetail }));
              }
            });
        });

        if (res.nextPageToken) {
          this.store.dispatch(
            addPageToken({
              pageTokenKey: PageTokenKey.Next,
              token: res.nextPageToken,
            }),
          );
        }
        if (res.prevPageToken) {
          this.store.dispatch(
            addPageToken({
              pageTokenKey: PageTokenKey.Prev,
              token: res.prevPageToken,
            }),
          );
        }
      });
  }

  constructor(
    private itemsService: ItemsService,
    private store: Store,
    private apiService: ApiService,
  ) {}
}
