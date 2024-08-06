import { createReducer, on } from '@ngrx/store';
import { dataFetch, dataUpdate } from '../actions/data.actions';
import { initialStore } from '../state';
import { AppStore } from '../state.model';

export const dataReducer = createReducer(
  initialStore,
  on(
    dataFetch,
    (store, { videoCards }): AppStore => ({
      ...store,
      data: [...videoCards],
    }),
  ),
  on(
    dataUpdate,
    (store, { videoCard }): AppStore => ({
      ...store,
      data: [
        ...store.data.map((item) => {
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
