import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Subscription } from 'rxjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ItemsService } from '../../shared/services/items.service';
import { VideoCard } from '../../shared/models/video-card.model';
import { NFormatterPipe } from '../../shared/components/statistics/pipes/n-formatter.pipe';
import { DFormatterPipe } from './pipes/d-formatter.pipe';
import { StatisticsComponent } from '../../shared/components/statistics/statistics.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NzImageModule,
    NFormatterPipe,
    NzTypographyModule,
    DFormatterPipe,
    StatisticsComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  public item?: VideoCard;
  private itemsService = inject(ItemsService);
  public isScreenSmall: boolean = false;
  private breakpointSubscription?: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) {
    const { id } = this.activateRoute.snapshot.params;
    this.item = this.itemsService.getItemById(id);
  }

  public get previewImg() {
    return this?.item?.snippet.thumbnails['maxres']?.url ?? '';
  }

  ngOnInit() {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 1020px)'])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }

  ngOnDestroy() {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }
}
