import { Pipe, PipeTransform } from '@angular/core';
import { VideoCard } from '../../../shared/models/video-card.model';
import { SortDirection, SortType } from '../../../stores/types';

@Pipe({
  name: 'videoCardSort',
  standalone: true,
})
export class VideoCardSortPipe implements PipeTransform {
  transform(
    cards: VideoCard[],
    searchInput: string,
  ): VideoCard[] {
    if (!cards || !searchInput) {
      return []
    };
    const sortByInput = cards.filter((item) => item.snippet.title.includes(searchInput));
    return sortByInput;
  }
}
