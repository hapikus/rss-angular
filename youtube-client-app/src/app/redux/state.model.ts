import { Statistics, VideoCardWithDetails } from '@models/video-card.model';

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
  Favorites = 'favorites',
}

export enum PageTokenKey {
  Prev = 'prev',
  Next = 'next',
}

export interface PageTokens {
  [PageTokenKey.Prev]: string,
  [PageTokenKey.Next]: string,
}

export interface CustomCard {
  title: string,
  description: string,
  previewImage: string,
  video: string,
  createDate: Date,
  tags?: string[],
}

export interface FavoriteCard extends CustomCard {
  id: string;
  statistics?: Statistics;
}

export interface AppStore {
  searchInput: string;
  sortType: SortType;
  sortInput: string;
  sortDirection: SortDirection;
  videos: VideoCardWithDetails[];
  page: Page;
  favorites: FavoriteCard[];
  customCards: CustomCard[],
  pageTokens: PageTokens,
  pageNumber: number,
}
