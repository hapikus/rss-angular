import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { VideoCard } from '@models/video-card.model';
import { NFormatterPipe } from '@shared/components/statistics/pipes/n-formatter.pipe';
import { store } from '@stores/store';
import { Page } from '@stores/types';
import { StatisticsComponent } from '@shared/components/statistics/statistics.component';
import { ApiService } from '@services/api/api.service';
import { ItemsService } from '@services/items/items.service';
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
  public item?: VideoCard;
  public isScreenSmall: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1020px)'])
    .pipe(map((state) => state.matches));

  public rowsConst = ROWS;

  constructor(
    private activateRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,
    private itemService: ItemsService,
  ) {
    const { id } = this.activateRoute.snapshot.params;
    const item = this.itemService.getItemById(id);
    this.item = item;
    if (!!this.item && !item?.statistics) {
      this.apiService.getVideo(id).subscribe((data) => {
        this.item!.statistics = data.items[0].statistics;
      });
    }
  }

  public ngOnInit(): void {
    store.page = Page.Details;
  }

  public get previewImg(): string {
    const result = {
      width: 0,
      url: '',
    };
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
  }
}
