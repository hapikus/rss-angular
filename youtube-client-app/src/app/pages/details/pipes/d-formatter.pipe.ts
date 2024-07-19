import { Pipe, PipeTransform } from '@angular/core';
import { DAYS, MONTHS } from './constatns';

@Pipe({
  name: 'dFormatter',
  standalone: true,
})
export class DFormatterPipe implements PipeTransform {
  transform(value: Date): string {
    const date: Date = new Date(value);
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
}
