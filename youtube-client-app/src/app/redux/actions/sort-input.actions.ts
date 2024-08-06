import { createAction, props } from '@ngrx/store';

export const sortInputChange = createAction(
  '[Sort Input] Change',
  props<{ input: string }>(),
);
