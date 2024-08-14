import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSortedItems } from 'src/app/redux/selectors/videos.selector';
import { Page, PageTokenKey } from 'src/app/redux/state.model';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '@shared/components/cards/cards.component';
import { selectCustomCards } from 'src/app/redux/selectors/custom-card.selector';
import { selectPageTokens } from 'src/app/redux/selectors/page-token.selector';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { selectPageNumber } from 'src/app/redux/selectors/page-number.selector';
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
  public sortedItems$ = this.store.select(selectSortedItems);

  public customCards$ = this.store.select(selectCustomCards);
  public pageTokens$ = this.store.select(selectPageTokens);
  public pageNumber$ = this.store.select(selectPageNumber);

  public pageTokenKeyEnum = PageTokenKey;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Main }));
  }

  public pageLoad(pageTokenKey: PageTokenKey): void {
    switch (pageTokenKey) {
      case PageTokenKey.Next:
        this.store.dispatch(videosFetchNext());
        break;
      default:
        this.store.dispatch(videosFetchPrev());
        break;
    }
  }
}
