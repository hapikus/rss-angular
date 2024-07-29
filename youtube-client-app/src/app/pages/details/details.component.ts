import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ItemsService } from '../../services/items.service';
import { VideoCard } from '../../models/video-card.model';
import { NFormatterPipe } from '../../shared/components/statistics/pipes/n-formatter.pipe';
import { DFormatterPipe } from './pipes/d-formatter.pipe';
import { StatisticsComponent } from '../../shared/components/statistics/statistics.component';

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
export class DetailsComponent {
  public item!: VideoCard;
  public isScreenSmall: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1020px)'])
    .pipe(map((state) => state.matches));

  public rowsConst = ROWS;

  constructor(
    private activateRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private itemsService: ItemsService,
  ) {
    const { id } = this.activateRoute.snapshot.params;
    this.item = this.itemsService.getItemById(id)!;
  }

  public get previewImg() {
    return this.item.snippet.thumbnails['maxres']?.url ?? '';
  }
}
