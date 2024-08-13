import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@services/api/api.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { sortTypeChange } from 'src/app/redux/actions/sort-type.actions';
import { selectSortType } from 'src/app/redux/selectors/sort-type.selector';
import { selectSortDirection } from 'src/app/redux/selectors/sort-direction.selector';
import { sortDirectionAsc, sortDirectionDesc } from 'src/app/redux/actions/sort-direction.actions';
import { SortType, SortDirection } from 'src/app/redux/state.model';
import { selectVideo } from 'src/app/redux/selectors/videos.selector';
import { VideoCard } from '@models/video-card.model';
import { sortInputChange } from 'src/app/redux/actions/sort-input.actions';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NzTypographyModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzRadioModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit, OnDestroy {
  public dataSubs?: Subscription;
  public data$ = this.store.select(selectVideo);
  public dataCurrent: VideoCard[] = [];

  public sortTypeSubs?: Subscription;
  public sortType$ = this.store.select(selectSortType);
  public sortTypeCurrent: SortType = SortType.Date;

  public sortDirectionSubs?: Subscription;
  public sortDirection$ = this.store.select(selectSortDirection);
  public sortDirectionCurrent = SortDirection.ASC;

  public sortInput: string = '';

  public sortDirectionEnum = SortDirection;
  public sortTypeButton = [
    SortType.Date,
    SortType.CountOfViews,
    SortType.ByWordOrSentance,
  ];

  public ngOnInit(): void {
    this.dataSubs = this.data$.subscribe((data) => {
      this.dataCurrent = data;
    });
    this.sortTypeSubs = this.sortType$.subscribe((type) => {
      this.sortTypeCurrent = type;
    });
    this.sortDirectionSubs = this.sortDirection$.subscribe((direction) => {
      this.sortDirectionCurrent = direction;
    });
  }

  public ngOnDestroy(): void {
    this.dataSubs?.unsubscribe();
    this.sortTypeSubs?.unsubscribe();
    this.sortDirectionSubs?.unsubscribe();
  }

  private updateDirection(sortType: SortType) {
    if (this.sortTypeCurrent !== sortType) {
      this.store.dispatch(sortDirectionAsc());
      return;
    }

    if (this.sortDirectionCurrent === SortDirection.ASC) {
      this.store.dispatch(sortDirectionDesc());
      return;
    }

    this.store.dispatch(sortDirectionAsc());
  }

  public setSortType(sortType: SortType): void {
    switch (sortType) {
      case SortType.Date:
        this.updateDirection(sortType);
        this.store.dispatch(sortTypeChange({ sortType }));
        break;
      case SortType.CountOfViews:
        this.updateDirection(sortType);
        this.store.dispatch(sortTypeChange({ sortType }));
        break;
      case SortType.ByWordOrSentance:
        this.store.dispatch(sortInputChange({ input: this.sortInput }));
        this.updateDirection(sortType);
        this.store.dispatch(sortTypeChange({ sortType }));
        break;
      default:
        break;
    }
  }

  constructor(private apiService: ApiService, private store: Store) {}
}
