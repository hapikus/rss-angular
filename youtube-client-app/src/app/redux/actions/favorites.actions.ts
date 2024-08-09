import { createAction, props } from '@ngrx/store';
import { FavoriteCard } from '../state.model';

export const addFavorite = createAction(
  '[Favorite] Add',
  props<{ favoriteCard: FavoriteCard }>(),
);

export const removeFavorite = createAction(
  '[Favorite] Remove',
  props<{ id: string }>(),
);
