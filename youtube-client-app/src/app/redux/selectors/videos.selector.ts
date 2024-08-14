import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sortMapItems } from '@shared/utilities/sort-map-items';
import { getItemById } from '@shared/utilities/get-card-by-id';
import { AppStore, SortDirection } from '../state.model';
import { selectFavorites } from './favorites.selector';
import { selectCustomCards } from './custom-card.selector';
import { selectSortDirection } from './sort-direction.selector';
import { selectSortType } from './sort-type.selector';
import { selectSortInput } from './sort-input.selector';

export const selectVideosFeature = createFeatureSelector<AppStore>('videos');

export const selectVideos = createSelector(
  selectVideosFeature,
  (state: AppStore) => state.videos,
);

export const selectVideoById = (videoId: string) => createSelector(
  selectVideosFeature,
  (state: AppStore) => state.videos.filter((item) => item.id === videoId)[0],
);

export const selectItemForDetails = (videoId: string) => createSelector(
  selectVideos,
  selectFavorites,
  selectCustomCards,
  (stateVideos, stateFavorites, stateCustom) => (
    getItemById({ videoId, stateVideos, stateFavorites, stateCustom })
  ),
);

export const selectSortedItems = createSelector(
  selectVideos,
  selectSortType,
  selectSortDirection,
  selectSortInput,
  (cards, sortType, sortDirection, sortInput) => (
    cards.toSorted((cardOne, cardTwo) => {
      if (sortDirection === SortDirection.DESC) {
        [cardOne, cardTwo] = [cardTwo, cardOne];
      }
      return sortMapItems[sortType](cardOne, cardTwo, sortInput);
    })
  ),
);
