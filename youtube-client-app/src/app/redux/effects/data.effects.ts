/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from '@services/api/api.service';
import { from, map, mergeMap, startWith, switchMap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { SearchResponse } from '@models/search.model';
import { selectSearchInput } from '../selectors/search-input.selector';
import { selectPageTokenByType } from '../selectors/page-token.selector';
import { PageTokenKey } from '../state.model';
import { dataFetchSuccess, dataUpdateError, dataUpdateSuccess } from '../actions/data.actions';
import { addPageToken } from '../actions/page-token.actions';

enum DataActions {
  DataFetch = '[Data] Fetch',
  DataFetchNext = '[Data] Fetch Next',
  DataFetchPrev = '[Data] Fetch Prev',
}

@Injectable()
export class DataEffects {
  constructor(
    private actions: Actions,
    private apiService: ApiService,
    private store: Store,
  ) {}

  loadVideos$ = createEffect(() => {
    return this.actions.pipe(
      ofType(
        DataActions.DataFetch,
        DataActions.DataFetchNext,
        DataActions.DataFetchPrev,
      ),
      concatLatestFrom(() => [
        this.store.select(selectSearchInput),
        this.store.select(selectPageTokenByType(PageTokenKey.Next)),
        this.store.select(selectPageTokenByType(PageTokenKey.Prev)),
      ]),
      switchMap(([{ type }, input, tokenNext, tokenPrev]) => {
        let token = '';
        switch (type) {
          case DataActions.DataFetchNext:
            token = tokenNext;
            break;
          case DataActions.DataFetchPrev:
            token = tokenPrev;
            break;
          default:
            break;
        }
        return this.apiService.getVideos(input, '8', token).pipe(
          mergeMap((res: SearchResponse) => {
            const actions = [];

            actions.push(dataFetchSuccess({ videoCards: res.items }));

            const videoDetailsActions$ = res.items.map((video) =>
              this.apiService.getVideoWithDetails(video.id.videoId).pipe(
                map((detailsRes: SearchResponse) => {
                  if (detailsRes && detailsRes.items.length > 0) {
                    const videoDetail = detailsRes.items[0];
                    return dataUpdateSuccess({ videoCard: videoDetail });
                  }
                  return dataUpdateError();
                }),
              ));

            if (res.nextPageToken) {
              actions.push(
                addPageToken({
                  pageTokenKey: PageTokenKey.Next,
                  token: res.nextPageToken,
                }),
              );
            }
            if (res.prevPageToken) {
              actions.push(
                addPageToken({
                  pageTokenKey: PageTokenKey.Prev,
                  token: res.prevPageToken,
                }),
              );
            }

            return from(videoDetailsActions$).pipe(
              mergeMap((detailAction$) => detailAction$),
              map((actionMap) => actionMap),
              startWith(...actions),
            );
          }),
        );
      }),
    );
  });
}
