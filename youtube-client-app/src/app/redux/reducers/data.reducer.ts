import { createReducer, on } from '@ngrx/store';
import { dataFetchSuccess, dataUpdateSuccess } from '../actions/data.actions';
import { initialStore } from '../state';
import { AppStore } from '../state.model';

export const dataReducer = createReducer(
  initialStore,
  on(
    dataFetchSuccess,
    (store, { videoCards }): AppStore => ({
      ...store,
      data: [...videoCards],
    }),
  ),
  on(
    dataUpdateSuccess,
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
