import { PageResponse } from '@services/api/types';
import { addPageToken } from '../actions/page-token.actions';
import { PageTokenKey } from '../state.model';
import { decreasePageNumber, increasePageNumber, resetPageNumber } from '../actions/page-number.actions';
import { videosFetchSuccess } from '../actions/videos.actions';
import { PageType, TokenActions } from './types';

const tokenActions = ({
  nextPageToken,
  prevPageToken,
}: TokenActions) => {
  const actions = [];
  if (nextPageToken) {
    actions.push(
      addPageToken({
        pageTokenKey: PageTokenKey.Next,
        token: nextPageToken,
      }),
    );
  }
  if (prevPageToken) {
    actions.push(
      addPageToken({
        pageTokenKey: PageTokenKey.Prev,
        token: prevPageToken,
      }),
    );
  }

  return actions;
};

const pageTypeAction = (pageType: PageType) => {
  switch (pageType) {
    case PageType.First:
      return resetPageNumber();
    case PageType.Next:
      return increasePageNumber();
    default:
      return decreasePageNumber();
  }
};

export const getActions = (response: PageResponse, pageType: PageType) => {
  const actions = [];
  const { videos, nextPageToken, prevPageToken } = response;
  actions.push(...tokenActions({ nextPageToken, prevPageToken }));

  const videoCards = videos.map((video) => video.items[0]);
  actions.push(videosFetchSuccess({ videoCards }));

  actions.push(pageTypeAction(pageType));

  return actions;
};
