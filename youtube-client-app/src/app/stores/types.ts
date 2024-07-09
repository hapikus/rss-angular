import { SearchResponse } from '../pages/main/search.model';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortType {
  Date = 'date',
  CountOfViews = 'count of views',
  ByWordOrSentance = 'by word or sentance',
  None = 'none',
}

export interface Store {
  searchInput: string;
  sortType: SortType;
  sortInput: string;
  sortDirection: SortDirection;
  mockData: SearchResponse;
}
