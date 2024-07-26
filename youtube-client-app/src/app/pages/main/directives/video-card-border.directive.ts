import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

const START_YEAR = 1970;
const MONTHS_PER_YEAR = 12;
const BORDER_HEIGHT = 6;
const BORDER_BLUE = '#2F80ED';
const BORDER_GREEN = '#27AE60';
const BORDER_YELLOW = '#F2C94C';
const BORDER_RED = '#EB5757';

@Directive({
  selector: '[appVideoCardBorder]',
  standalone: true,
})
export class VideoCardBorderDirective implements OnInit {
  @Input('appVideoCardBorder') public publicDate?: Date;
  constructor(
    public divRef: ElementRef<HTMLDivElement>,
    private renderer: Renderer2,
  ) {}

  private calculateDif(date: Date) {
    const diff: Date = new Date(
      new Date().getTime() - new Date(date).getTime(),
    );
    return {
      month:
        diff.getMonth() + (diff.getFullYear() - START_YEAR) * MONTHS_PER_YEAR,
      days: diff.getDate(),
    };
  }

  private getColor({ month, days }: { month: number; days: number }) {
    if (month >= 6) {
      return BORDER_RED;
    }
    if (month >= 1) {
      return BORDER_YELLOW;
    }
    if (month <= 1 && days > 7) {
      return BORDER_GREEN;
    }
    return BORDER_BLUE;
  }

  ngOnInit() {
    if (!this.publicDate) {
      return;
    }
    const diff = this.calculateDif(this.publicDate);
    const color = this.getColor(diff);
    this.renderer.setStyle(
      this.divRef.nativeElement,
      'border-bottom',
      `${BORDER_HEIGHT}px solid ${color}`,
    );
  }
}
