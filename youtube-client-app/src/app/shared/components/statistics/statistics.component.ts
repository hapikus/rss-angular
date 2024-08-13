import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Statistics } from '@models/video-card.model';
import { NFormatterPipe } from './pipes/n-formatter.pipe';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NzIconModule, NFormatterPipe],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit, OnChanges {
  @Input() public statistics?: Statistics;

  public statisticsForHtml: { icon: string; value: number }[] = [];

  public ngOnInit() {
    this.updateStatisticsForHtml();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['statistics'] && !changes['statistics'].firstChange) {
      this.updateStatisticsForHtml();
    }
  }

  public updateStatisticsForHtml() {
    this.statisticsForHtml = [
      { icon: 'eye', value: this.statistics?.viewCount ?? 0 },
      { icon: 'like', value: this.statistics?.likeCount ?? 0 },
      { icon: 'copy', value: this.statistics?.commentCount ?? 0 },
    ];
  }
}
