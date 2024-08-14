import { PageResponse } from '@services/api/types';
import { addPageToken } from '../actions/page-token.actions';
import { PageTokenKey } from '../state.model';
import { resetPageNumber } from '../actions/page-number.actions';
import { videosFetchSuccess } from '../actions/videos.actions';

interface TokenActions {
  nextPageToken?: string;
  prevPageToken?: string;
}

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

export const getActions = (response: PageResponse, isFirst: boolean = false) => {
  const actions = [];
  const { videos, nextPageToken } = response;
  actions.push(...tokenActions({ nextPageToken }));

  const videoCards = videos.map((video) => video.items[0]);
  actions.push(videosFetchSuccess({ videoCards }));
  if (isFirst) {
    actions.push(resetPageNumber());
  }

  return actions;
};
