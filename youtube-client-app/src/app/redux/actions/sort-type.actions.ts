import { createAction, props } from '@ngrx/store';
import { SortType } from '../state.model';

export const sortTypeChange = createAction(
  '[Sort Type] Change',
  props<{ sortType: SortType }>(),
);
