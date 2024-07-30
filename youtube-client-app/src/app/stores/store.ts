import { Page, SortDirection, SortType, Store } from './types';

export const store: Store = {
  searchInput: '',
  sortType: SortType.Date,
  sortInput: '',
  sortDirection: SortDirection.ASC,
  data: [],
  login: !!localStorage.getItem('fakeToken'),
  page: Page.Main,
};
