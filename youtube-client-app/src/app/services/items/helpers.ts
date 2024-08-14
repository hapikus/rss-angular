import { VideoCardWithDetails } from '@models/video-card.model';
import { SortType } from 'src/app/redux/state.model';

const date = (cardOne: VideoCardWithDetails, cardTwo: VideoCardWithDetails): number => {
  const dateOne = new Date(cardOne.snippet.publishedAt).getTime();
  const dateTwo = new Date(cardTwo.snippet.publishedAt).getTime();
  return dateTwo - dateOne;
};

const countOfViews = (cardOne: VideoCardWithDetails, cardTwo: VideoCardWithDetails): number => {
  const viewCountOne = cardOne?.statistics?.viewCount ?? 0;
  const viewCountTwo = cardTwo?.statistics?.viewCount ?? 0;
  return viewCountTwo - viewCountOne;
};

const bycountOccurrences = (
  cardOne: VideoCardWithDetails,
  cardTwo: VideoCardWithDetails,
  sortInput?: string,
): number => {
  if (!sortInput) {
    return 0;
  }
  const countOccurrences = (text: string, term: string) => {
    const regex = new RegExp(term, 'gi');
    return (text.match(regex) || []).length;
  };

  const countOne = countOccurrences(cardOne.snippet.description, sortInput);
  const countTwo = countOccurrences(cardTwo.snippet.description, sortInput);

  return countTwo - countOne;
};

export const sortMap: Record<
  SortType,
  (cardOne: VideoCardWithDetails, cardTwo: VideoCardWithDetails, sortInput?: string) => number
> = {
  [SortType.Date]: date,
  [SortType.CountOfViews]: countOfViews,
  [SortType.ByWordOrSentance]: bycountOccurrences,
};
