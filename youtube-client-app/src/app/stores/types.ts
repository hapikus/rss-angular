import { SearchResponse } from '../models/search.model';

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

export interface Store {
  searchInput: string;
  sortType: SortType;
  sortInput: string;
  sortDirection: SortDirection;
  data: SearchResponse;
  login: boolean;
  page: Page;
}
