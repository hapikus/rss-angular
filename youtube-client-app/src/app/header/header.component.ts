import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { store } from '../stores/store';
import { SortType, Store } from '../stores/types';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public store: Store = store;
  public sortType = SortType;
  public isShow: boolean = false;

  public toggleSettingShow(): void {
    this.isShow = !this.isShow;
  }

  public setSorting(sortType: SortType): void {
    this.store.sortType = sortType;
  }
}
