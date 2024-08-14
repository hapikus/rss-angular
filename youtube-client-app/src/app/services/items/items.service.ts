import { Injectable } from '@angular/core';
import { VideoCard, VideoCardWithDetails } from '@models/video-card.model';
import { SortDirection, SortType } from 'src/app/redux/state.model';
import { sortMap } from './helpers';

interface ForSorted {
  cards: VideoCardWithDetails[],
  sortType: SortType,
  sortDirection: SortDirection,
  sortInput: string,
}
@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  public getSortedItems(forSorted: ForSorted): VideoCardWithDetails[] {
    const { cards, sortType, sortDirection, sortInput } = forSorted;
    return cards.toSorted((cardOne, cardTwo) => {
      if (sortDirection === SortDirection.DESC) {
        [cardOne, cardTwo] = [cardTwo, cardOne];
      }
      return sortMap[sortType](cardOne, cardTwo, sortInput);
    });
  }

  public getItemById(id: string, data: VideoCard[]) {
    const findItem = data.find((item) => item.id.videoId === id);
    return findItem;
  }
}
