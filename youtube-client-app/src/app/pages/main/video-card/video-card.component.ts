import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { RouterLink } from '@angular/router';
import { Statistics } from '../../../shared/models/video-card.model';
import { VideoCardBorderDirective } from '../directives/video-card-border.directive';
import { NFormatterPipe } from '../../../shared/components/statistics/pipes/n-formatter.pipe';
import { StatisticsComponent } from '../../../shared/components/statistics/statistics.component';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [
    NzCardModule,
    NzTypographyModule,
    NzStatisticModule,
    VideoCardBorderDirective,
    NFormatterPipe,
    RouterLink,
    StatisticsComponent,
  ],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent {
  @Input() public title: string = '';
  @Input() public statistics?: Statistics;
  @Input() public previewUrl?: string;
  @Input() public description?: string;
  @Input() public publishDate?: Date;
  @Input() public id?: string;
}
