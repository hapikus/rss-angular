import { CardType } from '@shared/components/cards/types';

interface Thumbnails {
  [key: string]: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Statistics {
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishedAt: Date;
  title: string;
  thumbnails: Thumbnails;
  tags: string[];
}

interface SnippetVideo extends Snippet {
  publishTime: Date;
}

interface SnippetDetails extends Snippet {
  localized: Localized;
}

export interface Id {
  kind: string;
  videoId: string;
}

export interface Card {
  title: string;
  statistics?: Statistics;
  previewUrl: string;
  description: string;
  publishDate: Date;
  id: string;
  cardType: CardType;
}

export interface VideoCardBase {
  kind: string;
  etag: string;
}

export interface VideoCard extends VideoCardBase {
  id: Id;
  snippet: SnippetVideo;
}

export interface VideoCardWithDetails extends VideoCardBase {
  id: string,
  snippet: SnippetDetails;
  statistics: Statistics;
}
