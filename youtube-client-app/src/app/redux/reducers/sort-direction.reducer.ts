import { createReducer, on } from '@ngrx/store';
import {
  sortDirectionAsc,
  sortDirectionDesc,
} from '../actions/sort-direction.actions';
import { initialStore } from '../state';
import { AppStore, SortDirection } from '../state.model';

export const sortDirectionReducer = createReducer(
  initialStore,
  on(
    sortDirectionAsc,
    (store): AppStore => ({
      ...store,
      sortDirection: SortDirection.ASC,
    }),
  ),
  on(
    sortDirectionDesc,
    (store): AppStore => ({
      ...store,
      sortDirection: SortDirection.DESC,
    }),
  ),
);
