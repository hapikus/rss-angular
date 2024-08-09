import { createAction, props } from '@ngrx/store';
import { PageTokenKey } from '../state.model';

export const addPageToken = createAction(
  '[Page Token] Add',
  props<{ pageTokenKey: PageTokenKey, token: string }>(),
);

export const removePageToken = createAction(
  '[Page Token] Remove',
  props<{ pageTokenKey: PageTokenKey }>(),
);
