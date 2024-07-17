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
    sortType: SortType,
    sortDirection: SortDirection,
    sortInput: string,
  ): VideoCard[] {
    if (!cards) return [];
    if (!searchInput) return cards;
    const sortByInput = cards.filter((item) => item.snippet.title.includes(searchInput));
    const sortByTypeAndDirection = this.sortByTypeAndDirection(
      sortByInput,
      sortType,
      sortDirection,
      sortInput,
    );
    return sortByTypeAndDirection;
  }

  private sortByTypeAndDirection(
    cards: VideoCard[],
    sortType: SortType,
    sortDirection: SortDirection,
    sortInput: string,
  ) {
    return cards.toSorted((cardOne, cardTwo) => {
      if (sortDirection === SortDirection.DESC) {
        [cardOne, cardTwo] = [cardTwo, cardOne];
      }
      switch (sortType) {
        case SortType.Date: {
          return (
            new Date(cardTwo.snippet.publishedAt).getTime() -
            new Date(cardOne.snippet.publishedAt).getTime()
          );
        }
        case SortType.CountOfViews: {
          return cardTwo.statistics.viewCount - cardOne.statistics.viewCount;
        }
        case SortType.ByWordOrSentance: {
          if (!sortInput) {
            return 0;
          }
          const countOccurrences = (text: string, term: string) => {
            const regex = new RegExp(term, 'gi');
            return (text.match(regex) || []).length;
          };

          const countOne = countOccurrences(
            cardOne.snippet.description,
            sortInput,
          );
          const countTwo = countOccurrences(
            cardTwo.snippet.description,
            sortInput,
          );

          return countTwo - countOne;
        }
        default: {
          return 0;
        }
      }
    });
  }
}
