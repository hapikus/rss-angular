import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, Observable, Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { VideoCard } from '@models/video-card.model';
import { NFormatterPipe } from '@shared/components/statistics/pipes/n-formatter.pipe';
import { StatisticsComponent } from '@shared/components/statistics/statistics.component';
import { ApiService } from '@services/api/api.service';
import { Store } from '@ngrx/store';
import { selectData } from 'src/app/redux/selectors/data.selector';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { Page } from 'src/app/redux/state.model';
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
  public dataSubs?: Subscription;
  public data$ = this.store.select(selectData);
  public dataCurrent: VideoCard[] = [];

  public item?: VideoCard;
  public isScreenSmall: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1020px)'])
    .pipe(map((state) => state.matches));

  public rowsConst = ROWS;

  constructor(
    private activateRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Details }));
    this.dataSubs = this.data$.subscribe((data) => {
      this.dataCurrent = data;
    });

    const { id } = this.activateRoute.snapshot.params;
    const item = this.dataCurrent.filter((videoCard) => videoCard.id.videoId === id);
    [this.item] = item;
    if (!!this.item && !this.item?.statistics) {
      this.apiService.getVideo(id).subscribe((data) => {
        this.item!.statistics = data.items[0].statistics;
      });
    }
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
