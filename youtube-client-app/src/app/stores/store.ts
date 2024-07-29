import { Page, SortDirection, SortType, Store } from './types';
import { SearchResponse } from '../models/search.model';

export const store: Store = {
  searchInput: '',
  sortType: SortType.Date,
  sortInput: '',
  sortDirection: SortDirection.ASC,
  data: {} as SearchResponse,
  login: !!localStorage.getItem('fakeToken'),
  page: Page.Main,
};
