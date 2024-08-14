import { createReducer, on } from '@ngrx/store';
import { addPageToken, removePageToken } from '../actions/page-token.actions';
import { initialStore } from '../state';
import { AppStore } from '../state.model';

export const pageTokenReducer = createReducer(
  initialStore,
  on(
    addPageToken,
    (store, { pageTokenKey, token }): AppStore => ({
      ...store,
      pageTokens: {
        ...store.pageTokens,
        [pageTokenKey]: token,
      },
    }),
  ),
  on(
    removePageToken,
    (store, { pageTokenKey }): AppStore => ({
      ...store,
      pageTokens: {
        ...store.pageTokens,
        [pageTokenKey]: '',
      },
    }),
  ),
);
