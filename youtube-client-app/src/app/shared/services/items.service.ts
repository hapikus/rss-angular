import { Injectable } from '@angular/core';
import { SortDirection, SortType, Store } from '../../stores/types';
import { store } from '../../stores/store';
import { VideoCard } from '../models/video-card.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private store: Store = store;

  public getFiltredItems(input: string) {
    const { items } = store.mockData;
    if (!items.length || !input) {
      return [];
    }
    const sortByInput = items.filter((item) => item.snippet.title.includes(input));
    return sortByInput;
  }

  public getSortedItems(
    cards: VideoCard[],
    sortType: SortType,
    sortDirection: SortDirection,
    sortInput: string,
  ): VideoCard[] {
    const sortMap: Record<
      SortType,
      (cardOne: VideoCard, cardTwo: VideoCard) => number
    > = {
      [SortType.Date]: (cardOne: VideoCard, cardTwo: VideoCard) => {
        const dateOne = new Date(cardOne.snippet.publishedAt).getTime();
        const dateTwo = new Date(cardTwo.snippet.publishedAt).getTime();
        return dateTwo - dateOne;
      },
      [SortType.CountOfViews]: (cardOne: VideoCard, cardTwo: VideoCard) => {
        const viewCountOne = cardOne.statistics.viewCount;
        const viewCountTwo = cardTwo.statistics.viewCount;
        return viewCountTwo - viewCountOne;
      },
      [SortType.ByWordOrSentance]: (cardOne: VideoCard, cardTwo: VideoCard) => {
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
      },
    };

    return cards.toSorted((cardOne, cardTwo) => {
      if (sortDirection === SortDirection.DESC) {
        [cardOne, cardTwo] = [cardTwo, cardOne];
      }
      return sortMap[sortType](cardOne, cardTwo);
    });
  }

  public getItemById(id: string) {
    const findItem = store.mockData.items.find((item) => item.id === id);
    return findItem;
  }
}
