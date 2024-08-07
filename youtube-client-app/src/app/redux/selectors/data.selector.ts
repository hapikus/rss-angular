import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';
import { selectFavorites } from './favorites.selector';

export const selectDataFeature = createFeatureSelector<AppStore>('data');

export const selectData = createSelector(
  selectDataFeature,
  (state: AppStore) => state.data,
);

export const selectDataById = (videoId: string) => createSelector(
  selectDataFeature,
  (state: AppStore) => state.data.filter((item) => item.id.videoId === videoId)[0],
);

export const selectFavoritesData = createSelector(
  selectFavorites,
  selectData,
  (favorites, data) => data.filter((item) => favorites.includes(item.id.videoId)),
);
