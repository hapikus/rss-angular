import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { BorderColors } from './types';

const START_YEAR = 1970;
const MONTHS_PER_YEAR = 12;
const BORDER_HEIGHT = 6;

@Directive({
  selector: '[appVideoCardBorder]',
  standalone: true,
})
export class VideoCardBorderDirective implements OnInit {
  @Input() public appVideoCardBorder?: Date;
  constructor(public divRef: ElementRef<HTMLDivElement>) {}

  private calculateDif(date: Date) {
    const diff: Date = new Date(
      new Date().getTime() - new Date(date).getTime()
    );
    return {
      month:
        diff.getMonth() + (diff.getFullYear() - START_YEAR) * MONTHS_PER_YEAR,
      days: diff.getDate(),
    };
  }

  private getColor({ month, days }: { month: number; days: number }) {
    if (month >= 6) {
      return BorderColors.Red;
    }
    if (month >= 1) {
      return BorderColors.Yellow;
    }
    if (month <= 1 && days > 7) {
      return BorderColors.Green;
    }
    return BorderColors.Blue;
  }

  ngOnInit() {
    if (!this.appVideoCardBorder) {
      return;
    }
    const diff = this.calculateDif(this.appVideoCardBorder);
    const color = this.getColor(diff);
    this.divRef.nativeElement.style.borderBottom = `${BORDER_HEIGHT}px solid ${color}`;
  }
}
