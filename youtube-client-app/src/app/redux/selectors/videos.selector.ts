import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectDataFeature = createFeatureSelector<AppStore>('data');

export const selectData = createSelector(
  selectDataFeature,
  (state: AppStore) => state.videos,
);

export const selectDataById = (videoId: string) => createSelector(
  selectDataFeature,
  (state: AppStore) => state.videos.filter((item) => item.id.videoId === videoId)[0],
);
