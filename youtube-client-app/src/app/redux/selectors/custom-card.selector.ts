import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore, CustomCard } from '../state.model';

export const selectCustomCardsFeature =
  createFeatureSelector<AppStore>('customCards');

export const selectCustomCards = createSelector(
  selectCustomCardsFeature,
  (state: AppStore) => state.customCards,
);

export const selectCustomCardsCount = createSelector(
  selectCustomCards,
  (cusomtCards: CustomCard[]) => cusomtCards.length,
);
