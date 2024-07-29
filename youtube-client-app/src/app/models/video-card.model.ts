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
  dislikeCount: number;
  favoriteCount: number;
  commentCount: number;
}

interface Snippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: Date;
  publishedAt: Date;
  title: string;
  thumbnails: Thumbnails;
  tags: string[];
}

export interface Id {
  kind: string,
  videoId: string,
}

export interface VideoCard {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  statistics: Statistics;
}
