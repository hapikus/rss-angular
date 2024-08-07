import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoCard } from '@models/video-card.model';
import { ItemsService } from '@services/items/items.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSortDirection } from 'src/app/redux/selectors/sort-direction.selector';
import { selectSortType } from 'src/app/redux/selectors/sort-type.selector';
import { selectData } from 'src/app/redux/selectors/data.selector';
import { Page, SortDirection, SortType } from 'src/app/redux/state.model';
import { selectSortInput } from 'src/app/redux/selectors/sort-input.selector';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '@shared/components/cards/cards.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardsComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  public dataSubs?: Subscription;
  public data$ = this.store.select(selectData);
  public dataCurrent: VideoCard[] = [];

  public sortTypeSubs?: Subscription;
  public sortType$ = this.store.select(selectSortType);
  public sortTypeCurrent: SortType = SortType.Date;

  public sortDirectionSubs?: Subscription;
  public sortDirection$ = this.store.select(selectSortDirection);
  public sortDirectionCurrent = SortDirection.ASC;

  public sortInputSubs?: Subscription;
  public sortInput$ = this.store.select(selectSortInput);
  public sortInputCurrent = '';

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
  }

  public ngOnDestroy(): void {
    this.dataSubs?.unsubscribe();
    this.sortTypeSubs?.unsubscribe();
    this.sortDirectionSubs?.unsubscribe();
    this.sortInputSubs?.unsubscribe();
  }

  constructor(private itemsService: ItemsService, private store: Store) {}
}
