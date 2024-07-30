import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { store } from '@stores/store';
import { SortType, SortDirection, Store } from '@stores/types';
import { ApiService } from '@services/api/api.service';

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
export class SettingsComponent {
  public store: Store = store;

  public sortTypeButton = [
    SortType.Date,
    SortType.CountOfViews,
    SortType.ByWordOrSentance,
  ];
  public sortDirectionEnum = SortDirection;
  public sortTypeCurrent = store.sortType;

  public getIds(): string[] {
    return Array.from(
      this.store.data.reduce((acc, item) => {
        if (!item.statistics) {
          acc.add(item.id.videoId);
        }
        return acc;
      }, new Set()),
    ) as string[];
  }

  public checkStatistics() {
    const ids: string[] = this.getIds();
    if (!ids.length) {
      return;
    }
    ids.forEach((id) => {
      this.apiService.getVideo(id).subscribe((data) => {
        store.data.forEach((item) => {
          if (item.id.videoId === id) {
            item.statistics = data.items[0].statistics;
          }
        });
      });
    });
  }

  public setDirection(sortType: SortType): void {
    if (sortType === SortType.CountOfViews) {
      this.checkStatistics();
    }
    if (this.sortTypeCurrent !== sortType) {
      this.sortTypeCurrent = sortType;
      store.sortType = sortType;
      store.sortDirection = SortDirection.ASC;
      return;
    }

    store.sortDirection =
      store.sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
  }

  constructor(
    private apiService: ApiService,
  ) {}
}
