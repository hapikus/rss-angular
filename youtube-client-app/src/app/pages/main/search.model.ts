import { VideoCard } from './video-card/video-card.model';

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoCard[];
}
