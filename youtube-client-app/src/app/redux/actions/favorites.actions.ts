import { createAction, props } from '@ngrx/store';

export const addFavorite = createAction(
  '[Favorite] Add',
  props<{ id: string }>(),
);

export const removeFavorite = createAction(
  '[Favorite] Remove',
  props<{ id: string }>(),
);
