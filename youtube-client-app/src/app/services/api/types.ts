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
