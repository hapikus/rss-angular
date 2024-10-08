/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from '@services/api/api.service';
import { from, mergeMap, switchMap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { PageResponse } from '@services/api/types';
import { selectSearchInput } from '../selectors/search-input.selector';
import { getActions } from './helpers';
import { PageTokenKey } from '../state.model';
import { selectPageTokenByType } from '../selectors/page-token.selector';
import { DataActions, PageType } from './types';

@Injectable()
export class DataEffects {
  constructor(
    private actions: Actions,
    private apiService: ApiService,
    private store: Store,
  ) {}

  private handleResponse = (response: PageResponse, pageType: PageType) => {
    const actions = getActions(response, pageType);
    return from(actions);
  };

  public getFirstPage = createEffect(() => {
    return this.actions.pipe(
      ofType(DataActions.VideosFetchFirst),
      switchMap(() => this.store.select(selectSearchInput)),
      switchMap((input) => this.apiService.getPage(input)),
      mergeMap((response) => this.handleResponse(response, PageType.First)),
    );
  });

  public getNextPage = createEffect(() => {
    return this.actions.pipe(
      ofType(DataActions.VideosFetchNext),
      concatLatestFrom(() => [
        this.store.select(selectSearchInput),
        this.store.select(selectPageTokenByType(PageTokenKey.Next)),
      ]),
      switchMap(([, input, token]) => this.apiService.getPage(input, token)),
      mergeMap((response) => this.handleResponse(response, PageType.Next)),
    );
  });

  public getPrevPage = createEffect(() => {
    return this.actions.pipe(
      ofType(DataActions.VideosFetchPrev),
      concatLatestFrom(() => [
        this.store.select(selectSearchInput),
        this.store.select(selectPageTokenByType(PageTokenKey.Prev)),
      ]),
      switchMap(([, input, token]) => this.apiService.getPage(input, token)),
      mergeMap((response) => this.handleResponse(response, PageType.Prev)),
    );
  });
}
