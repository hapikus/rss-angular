import { createReducer, on } from '@ngrx/store';
import { initialStore } from '../state';
import { AppStore } from '../state.model';
import { videosFetchSuccess, videoWithDetailsSuccess } from '../actions/videos.actions';

export const videosReducer = createReducer(
  initialStore,
  on(
    videosFetchSuccess,
    (store, { videoCards }): AppStore => ({
      ...store,
      videos: [...videoCards],
    }),
  ),
  on(
    videoWithDetailsSuccess,
    (store, { videoCard }): AppStore => ({
      ...store,
      videos: [
        ...store.videos.map((item) => {
          const itemNew = { ...item };
          if (item.id.videoId === (videoCard.id as unknown as string)) {
            itemNew.statistics = videoCard.statistics;
          }
          return itemNew;
        }),
      ],
    }),
  ),
);
