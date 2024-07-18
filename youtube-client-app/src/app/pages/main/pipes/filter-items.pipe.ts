import { Pipe, PipeTransform } from '@angular/core';
import { VideoCard } from '../../../shared/models/video-card.model';

@Pipe({
  name: 'filterItems',
  standalone: true,
})
export class FilterItemsPipe implements PipeTransform {
  transform(
    cards: VideoCard[],
    searchInput: string,
  ): VideoCard[] {
    if (!cards || !searchInput) {
      return [];
    }
    const sortByInput = cards.filter((item) => item.snippet.title.includes(searchInput));
    return sortByInput;
  }
}
