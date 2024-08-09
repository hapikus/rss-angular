import { AppStore, Page, PageTokenKey, SortDirection, SortType } from './state.model';

export const initialStore: AppStore = {
  searchInput: '',
  sortType: SortType.Date,
  sortInput: '',
  sortDirection: SortDirection.ASC,
  data: [],
  page: Page.Main,
  favorites: [],
  customCards: [],
  pageTokens: {
    [PageTokenKey.Prev]: '',
    [PageTokenKey.Next]: '',
  },
  pageNumber: 1,
};
