import { createReducer, on } from '@ngrx/store';
import { AppStore } from '../state.model';
import { initialStore } from '../state';
import { sortTypeChange } from '../actions/sort-type.actions';

export const sortTypeReducer = createReducer(
  initialStore,
  on(
    sortTypeChange,
    (store, { sortType }): AppStore => ({
      ...store,
      sortType,
    }),
  ),
);
