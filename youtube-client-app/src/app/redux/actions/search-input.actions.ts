import { createAction, props } from '@ngrx/store';

export const searchInputChange = createAction(
  '[Search Input] Change',
  props<{ input: string }>(),
);
