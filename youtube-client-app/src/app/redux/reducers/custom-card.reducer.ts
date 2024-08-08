import { createReducer, on } from '@ngrx/store';
import { initialStore } from '../state';
import {
  addCustomCard,
  removeCustomCard,
} from '../actions/custom-card.actions';
import { AppStore } from '../state.model';

export const customCardsReducer = createReducer(
  initialStore,
  on(
    addCustomCard,
    (store, { customCard }): AppStore => ({
      ...store,
      customCards: [...store.customCards, customCard],
    }),
  ),
  on(
    removeCustomCard,
    (store, { index }): AppStore => ({
      ...store,
      customCards: [...store.customCards.filter((_item, ind) => ind !== index)],
    }),
  ),
);
