import { Injectable } from '@angular/core';
import { SortDirection, SortType } from '../../stores/types';
import { store } from '../../stores/store';
import { VideoCard } from '../../models/video-card.model';
import { sortMap } from './helpers';

interface ForSorted {
  cards: VideoCard[],
  sortType: SortType,
  sortDirection: SortDirection,
  sortInput: string,
}
@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  public getFiltredItems(input: string) {
    if (!store.data || !store.data.length || !input) {
      return [];
    }
    return store.data;
  }

  public getSortedItems(forSorted: ForSorted): VideoCard[] {
    const { cards, sortType, sortDirection, sortInput } = forSorted;
    return cards.toSorted((cardOne, cardTwo) => {
      if (sortDirection === SortDirection.DESC) {
        [cardOne, cardTwo] = [cardTwo, cardOne];
      }
      return sortMap[sortType](cardOne, cardTwo, sortInput);
    });
  }

  public getItemById(id: string) {
    const findItem = store.data.find((item) => item.id.videoId === id);
    return findItem;
  }
}
