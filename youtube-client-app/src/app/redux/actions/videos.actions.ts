import { VideoCardWithDetails } from '@models/video-card.model';
import { createAction, props } from '@ngrx/store';

export const videosFetchFirst = createAction(
  '[Videos] Fetch First',
);

export const videosFetchNext = createAction(
  '[Videos] Fetch Next',
);

export const videosFetchPrev = createAction(
  '[Videos] Fetch Prev',
);

export const videosFetchSuccess = createAction(
  '[Videos] Fetch Success',
  props<{ videoCards: VideoCardWithDetails[] }>(),
);

export const videosFetchError = createAction(
  '[Videos] Fetch Error',
);
