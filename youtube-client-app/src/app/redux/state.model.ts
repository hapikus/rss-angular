import { VideoCard } from '@models/video-card.model';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortType {
  Date = 'date',
  CountOfViews = 'count of views',
  ByWordOrSentance = 'by word or sentence',
}

export enum Page {
  Admin = 'admin',
  Details = 'details',
  Login = 'login',
  Main = 'main',
  NotFound = 'notFound',
}

export interface AppStore {
  searchInput: string;
  sortType: SortType;
  sortInput: string;
  sortDirection: SortDirection;
  data: VideoCard[];
  page: Page;
}
