import { Component, OnInit } from '@angular/core';
import { VideoCardWithDetails } from '@models/video-card.model';
import { ItemsService } from '@services/items/items.service';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { selectSortDirection } from 'src/app/redux/selectors/sort-direction.selector';
import { selectSortType } from 'src/app/redux/selectors/sort-type.selector';
import { selectVideos } from 'src/app/redux/selectors/videos.selector';
import { Page, PageTokenKey } from 'src/app/redux/state.model';
import { selectSortInput } from 'src/app/redux/selectors/sort-input.selector';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '@shared/components/cards/cards.component';
import { selectCustomCards } from 'src/app/redux/selectors/custom-card.selector';
import { selectPageTokens } from 'src/app/redux/selectors/page-token.selector';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { selectSearchInput } from 'src/app/redux/selectors/search-input.selector';
import { selectPageNumber } from 'src/app/redux/selectors/page-number.selector';
import { decreasePageNumber, increasePageNumber } from 'src/app/redux/actions/page-number.actions';
import { videosFetchNext, videosFetchPrev } from 'src/app/redux/actions/videos.actions';

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
export class MainComponent implements OnInit {
  public data$ = this.store.select(selectVideos);
  public customCards$ = this.store.select(selectCustomCards);
  public sortType$ = this.store.select(selectSortType);
  public sortDirection$ = this.store.select(selectSortDirection);
  public sortInput$ = this.store.select(selectSortInput);
  public pageTokens$ = this.store.select(selectPageTokens);
  public pageNumber$ = this.store.select(selectPageNumber);
  public searchInput$ = this.store.select(selectSearchInput);

  public pageTokenKeyEnum = PageTokenKey;

  public get items$(): Observable<VideoCardWithDetails[]> {
    return combineLatest([
      this.data$,
      this.sortType$,
      this.sortDirection$,
      this.sortInput$,
    ]).pipe(
      map(([data, sortType, sortDirection, sortInput]) => (
        this.itemsService.getSortedItems({
          cards: data,
          sortType,
          sortDirection,
          sortInput,
        })
      )),
    );
  }

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Main }));
  }

  public pageLoad(pageTokenKey: PageTokenKey): void {
    switch (pageTokenKey) {
      case PageTokenKey.Next:
        this.store.dispatch(increasePageNumber());
        this.store.dispatch(videosFetchNext());
        break;
      default:
        this.store.dispatch(decreasePageNumber());
        this.store.dispatch(videosFetchPrev());
        break;
    }
  }

  constructor(
    private itemsService: ItemsService,
    private store: Store,
  ) {}
}
