import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponse } from '@models/search.model';
import { Params, ParamsVideo, Endpoints, ParamsStatistics } from './types';

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
      `/${Endpoints.Search}`,
      { params },
    );
  }

  public getVideo(id: string): Observable<SearchResponse> {
    let params = new HttpParams();
    params = params.set(Params.Part, ParamsStatistics.Part);
    params = params.set('id', id);

    return this.http.get<SearchResponse>(
      `/${Endpoints.Videos}`,
      { params },
    );
  }
}
