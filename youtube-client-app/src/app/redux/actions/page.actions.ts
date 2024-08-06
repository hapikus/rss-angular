import { createAction, props } from '@ngrx/store';
import { Page } from '../state.model';

export const pageChange = createAction(
  '[Page] Change',
  props<{ page: Page }>(),
);
