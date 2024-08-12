import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponse } from '@models/search.model';
import { Params, ParamsVideo, Endpoints, ParamsStatistics } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  public getVideos(q: string, maxResult: string): Observable<SearchResponse> {
    let params = new HttpParams();
    params = params.set(Params.Type, ParamsVideo.Type);
    params = params.set(Params.Part, ParamsVideo.Part);
    params = params.set(Params.MaxResults, maxResult);
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
