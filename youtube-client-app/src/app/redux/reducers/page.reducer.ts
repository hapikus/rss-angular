import { createReducer, on } from '@ngrx/store';
import { pageChange } from '../actions/page.actions';
import { initialStore } from '../state';
import { AppStore } from '../state.model';

export const pageReducer = createReducer(
  initialStore,
  on(
    pageChange,
    (store, { page }): AppStore => ({
      ...store,
      page,
    }),
  ),
);
