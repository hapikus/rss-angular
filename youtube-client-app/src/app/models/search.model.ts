import { VideoCard, VideoCardWithDetails } from './video-card.model';

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoCard[];
  nextPageToken?: string,
  prevPageToken?: string,
  regionCode: string,
}

export interface SearchResponseDetails {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoCardWithDetails[];
  nextPageToken?: string,
  prevPageToken?: string,
  regionCode: string,
}
