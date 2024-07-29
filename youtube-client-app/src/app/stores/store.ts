import { SortDirection, SortType, Store } from './types';
import * as searchMock from './search-mock.json';
import { SearchResponse } from '../models/search.model';

export const store: Store = {
  searchInput: '',
  sortType: SortType.Date,
  sortInput: '',
  sortDirection: SortDirection.ASC,
  mockData: searchMock as unknown as SearchResponse,
  login: !!localStorage.getItem('fakeToken'),
};
