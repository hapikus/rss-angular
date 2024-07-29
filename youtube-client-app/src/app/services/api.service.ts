import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  public searchVideos(q: string): Observable<SearchResponse> {
    let params = new HttpParams();
    params = params.set('type', 'video');
    params = params.set('part', 'snippet');
    params = params.set('maxResults', 6);
    params = params.set('q', q);

    return this.http.get<SearchResponse>(
      `${this.apiUrl}/search`,
      { params },
    );
  }
}
