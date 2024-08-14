import { createAction, props } from '@ngrx/store';
import { CustomCard } from '../state.model';

export const addCustomCard = createAction(
  '[Custom Card] Add',
  props<{ customCard: CustomCard }>(),
);

export const removeCustomCard = createAction(
  '[Custom Card] Remove',
  props<{ index: number }>(),
);
