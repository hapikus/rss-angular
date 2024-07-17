import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { Statistics } from '../../../shared/models/video-card.model';
import { VideoCardBorderDirective } from '../directives/video-card-border.directive';
import { NFormatterPipe } from '../pipes/n-formatter.pipe';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [
    NzCardModule,
    NzTypographyModule,
    NzIconModule,
    NzStatisticModule,
    VideoCardBorderDirective,
    NFormatterPipe,
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
}
