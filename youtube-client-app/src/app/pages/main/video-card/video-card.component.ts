import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { Statistics } from './video-card.model';
import { VideoCardBorderDirective } from '../../../directives/video-card-border.directive';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [
    NzCardModule,
    NzTypographyModule,
    NzIconModule,
    NzStatisticModule,
    VideoCardBorderDirective,
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

  public nFormatter(num: number, digits: number) {
    const lookup: { value: number; symbol: string }[] = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast(({ value }) => num >= value);
    return item
      ? (num / item.value)
          .toFixed(digits)
          .replace(regexp, '')
          .concat(item.symbol)
      : '0';
  }
}
