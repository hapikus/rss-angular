import { VideoCard } from '@models/video-card.model';
import { createAction, props } from '@ngrx/store';

export const dataFetch = createAction(
  '[Data] Fetch',
  props<{ videoCards: VideoCard[] }>(),
);

export const dataUpdate = createAction(
  '[Data] Update',
  props<{ videoCard: VideoCard }>(),
);
