export enum PageType {
  First = 'first',
  Next = 'next',
  Prev = 'prev',
}

export enum DataActions {
  VideosFetchFirst = '[Videos] Fetch First',
  VideosFetchNext = '[Videos] Fetch Next',
  VideosFetchPrev = '[Videos] Fetch Prev',
}

export interface TokenActions {
  nextPageToken?: string;
  prevPageToken?: string;
}
