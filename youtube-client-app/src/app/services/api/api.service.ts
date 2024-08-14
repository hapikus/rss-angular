import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { SearchResponse, SearchResponseDetails } from '@models/search.model';
import { Params, ParamsVideo, Endpoints, ParamsStatistics, PageResponse } from './types';

const MAX_RESULT = '8';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getVideos(q: string, maxResult?: string, pageToken?: string): Observable<SearchResponse> {
    let params = new HttpParams();
    params = params.set(Params.Type, ParamsVideo.Type);
    params = params.set(Params.Part, ParamsVideo.Part);
    if (maxResult) {
      params = params.set(Params.MaxResults, maxResult);
    }
    if (pageToken) {
      params = params.set(Params.PageToken, pageToken);
    }
    params = params.set(Params.Q, q);

    return this.http.get<SearchResponse>(
      Endpoints.Search,
      { params },
    );
  }

  public getVideoWithDetails(id: string): Observable<SearchResponseDetails> {
    let params = new HttpParams();
    params = params.set(Params.Part, ParamsStatistics.Part);
    params = params.set('id', id);

    return this.http.get<SearchResponseDetails>(
      Endpoints.Videos,
      { params },
    );
  }

  public getPage(q: string, token?: string): Observable<PageResponse> {
    return this.getVideos(q, MAX_RESULT, token).pipe(
      switchMap((response: SearchResponse) => {
        const videoIds = response.items.map((item) => item.id.videoId);
        const { nextPageToken, prevPageToken } = response;
        const videoDetails$ = forkJoin(videoIds.map((id) => this.getVideoWithDetails(id)));

        return videoDetails$.pipe(
          map((videos) => ({
            videos,
            nextPageToken,
            prevPageToken,
          })),
        );
      }),
    );
  }
}
