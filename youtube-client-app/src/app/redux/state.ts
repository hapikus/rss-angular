import { AppStore, Page, SortDirection, SortType } from './state.model';

export const initialStore: AppStore = {
  searchInput: '',
  sortType: SortType.Date,
  sortInput: '',
  sortDirection: SortDirection.ASC,
  data: [],
  page: Page.Main,
};
