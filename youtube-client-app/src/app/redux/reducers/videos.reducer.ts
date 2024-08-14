import { createReducer, on } from '@ngrx/store';
import { initialStore } from '../state';
import { AppStore } from '../state.model';
import { videosFetchSuccess } from '../actions/videos.actions';

export const videosReducer = createReducer(
  initialStore,
  on(
    videosFetchSuccess,
    (store, { videoCards }): AppStore => ({
      ...store,
      videos: [...videoCards],
    }),
  ),
);
