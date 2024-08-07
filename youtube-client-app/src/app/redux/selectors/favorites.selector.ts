import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectFavoriteFeature = createFeatureSelector<AppStore>('favorites');

export const selectFavorites = createSelector(
  selectFavoriteFeature,
  (state: AppStore) => state.favorites,
);

export const selectIsFavorite = (videoId: string) =>
  createSelector(
    selectFavoriteFeature,
    (state: AppStore) => (!!state.favorites.filter((item) => item === videoId).length),
  );

  export const selectFavoriteCount = createSelector(
    selectFavorites,
    (favorites: string[]) => favorites.length,
  );
