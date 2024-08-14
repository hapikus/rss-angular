import { createReducer, on } from '@ngrx/store';
import { initialStore } from '../state';
import { AppStore } from '../state.model';
import { searchInputChange } from '../actions/search-input.actions';

export const searchInputReducer = createReducer(
  initialStore,
  on(
    searchInputChange,
    (store, { input }): AppStore => ({
      ...store,
      searchInput: input,
    }),
  ),
);
