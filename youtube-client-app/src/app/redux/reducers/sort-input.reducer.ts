import { createReducer, on } from '@ngrx/store';
import { sortInputChange } from '../actions/sort-input.actions';
import { initialStore } from '../state';
import { AppStore } from '../state.model';

export const sortInputReducer = createReducer(
  initialStore,
  on(
    sortInputChange,
    (store, { input }): AppStore => ({
      ...store,
      sortInput: input,
    }),
  ),
);
