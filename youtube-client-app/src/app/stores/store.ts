import { SortDirection, SortType, Store } from './types';
import * as searchMock from './search-mock.json';
import { SearchResponse } from '../pages/main/search.model';

export const store: Store = {
  searchInput: '',
  sortType: SortType.Date,
  sortInput: '',
  sortDirection: SortDirection.ASC,
  mockData: searchMock as unknown as SearchResponse,
};
