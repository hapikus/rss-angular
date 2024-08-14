import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../actions/favorites.actions';
import { initialStore } from '../state';
import { AppStore } from '../state.model';

export const favoritesReducer = createReducer(
  initialStore,
  on(
    addFavorite,
    (store, { favoriteCard }): AppStore => ({
      ...store,
      favorites: [...store.favorites, favoriteCard],
    }),
  ),
  on(
    removeFavorite,
    (store, { id }): AppStore => ({
      ...store,
      favorites: [...store.favorites.filter((item) => item.id !== id)],
    }),
  ),
);
