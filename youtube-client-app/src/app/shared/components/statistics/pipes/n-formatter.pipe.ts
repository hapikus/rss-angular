import { Pipe, PipeTransform } from '@angular/core';

type LookupItem = { value: number; symbol: string };

const LOOKUP: LookupItem[] = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'k' },
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'G' },
  { value: 1e12, symbol: 'T' },
  { value: 1e15, symbol: 'P' },
  { value: 1e18, symbol: 'E' },
];

@Pipe({
  name: 'nFormatter',
  standalone: true,
})
export class NFormatterPipe implements PipeTransform {
  transform(num: number, digits: number): string {
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = LOOKUP.findLast(({ value }) => num >= value);
    return item
      ? (num / item.value)
          .toFixed(digits)
          .replace(regexp, '')
          .concat(item.symbol)
      : '0';
  }
}
