import { SearchResponseDetails } from '@models/search.model';

export enum Endpoints {
  Search = 'search',
  Videos = 'videos',
}

export enum Params {
  Type = 'type',
  Part = 'part',
  MaxResults = 'maxResults',
  PageToken = 'pageToken',
  Q = 'q',
}

export enum ParamsVideo {
  Type = 'video',
  Part = 'snippet',
  MaxResult = 6,
}

export enum ParamsStatistics {
  Part = 'snippet,statistics',
}

export interface PageResponse {
  videos: SearchResponseDetails[];
  nextPageToken: string | undefined;
  prevPageToken: string | undefined;
}
