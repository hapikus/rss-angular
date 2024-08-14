import { createAction } from '@ngrx/store';

export const increasePageNumber = createAction('[Page Number] Increase');
export const decreasePageNumber = createAction('[Page Number] Decrease');
export const resetPageNumber = createAction('[Page Number] Reset');
