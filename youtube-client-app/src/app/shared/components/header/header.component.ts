import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CommonModule } from '@angular/common';
import { store } from '../../../stores/store';
import { SortDirection, SortType, Store } from '../../../stores/types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    NzTypographyModule,
    NzAnchorModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzRadioModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public store: Store = store;
  public sortTypeEnum = SortType;
  public sortDirectionEnum = SortDirection;
  public isShow: boolean = false;
  public sortTypeCurrent = store.sortType;
  public localSearch: string = '';

  public toggleSettingShow(): void {
    this.isShow = !this.isShow;
  }

  public setDirection(sortType: SortType): void {
    if (this.sortTypeCurrent !== sortType) {
      this.sortTypeCurrent = sortType;
      store.sortDirection = SortDirection.ASC;
      return;
    }

    store.sortDirection =
      store.sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
  }

  public setStoreSearch() {
    store.searchInput = this.localSearch;
  }
}
