import { VideoCard } from '@models/video-card.model';
import { createAction, props } from '@ngrx/store';

export const videosFetch = createAction(
  '[Videos] Fetch',
);

export const videosFetchNext = createAction(
  '[Videos] Fetch Next',
);

export const videosFetchPrev = createAction(
  '[Videos] Fetch Prev',
);

export const videosFetchSuccess = createAction(
  '[Videos] Fetch Success',
  props<{ videoCards: VideoCard[] }>(),
);

export const videosFetchError = createAction(
  '[Videos] Fetch Error',
);

export const videoWithDetails = createAction(
  '[Video] Update',
);

export const videoWithDetailsSuccess = createAction(
  '[Video] Update Success',
  props<{ videoCard: VideoCard }>(),
);

export const videoWithDetailsError = createAction(
  '[Video] Update Error',
);
