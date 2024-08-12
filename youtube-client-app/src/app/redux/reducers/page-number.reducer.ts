import { createReducer, on } from '@ngrx/store';
import { initialStore } from '../state';
import { AppStore } from '../state.model';
import {
  decreasePageNumber,
  increasePageNumber,
  resetPageNumber,
} from '../actions/page-number.actions';

export const pageNumberReducer = createReducer(
  initialStore,
  on(
    increasePageNumber,
    (store): AppStore => ({
      ...store,
      pageNumber: store.pageNumber + 1,
    }),
  ),
  on(
    decreasePageNumber,
    (store): AppStore => ({
      ...store,
      pageNumber: store.pageNumber - 1,
    }),
  ),
  on(
    resetPageNumber,
    (store): AppStore => ({
      ...store,
      pageNumber: 1,
    }),
  ),
);
