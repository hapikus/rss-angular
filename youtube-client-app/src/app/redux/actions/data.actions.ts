import { VideoCard } from '@models/video-card.model';
import { createAction, props } from '@ngrx/store';

export const dataFetch = createAction(
  '[Data] Fetch',
);

export const dataFetchNext = createAction(
  '[Data] Fetch Next',
);

export const dataFetchPrev = createAction(
  '[Data] Fetch Prev',
);

export const dataFetchSuccess = createAction(
  '[Data] Fetch Success',
  props<{ videoCards: VideoCard[] }>(),
);

export const dataFetchError = createAction(
  '[Data] Fetch Error',
);

export const dataUpdate = createAction(
  '[Data] Update',
);

export const dataUpdateSuccess = createAction(
  '[Data] Update Success',
  props<{ videoCard: VideoCard }>(),
);

export const dataUpdateError = createAction(
  '[Data] Update Error',
);
