import { VideoCard } from '../../models/video-card.model';
import { SortType } from '../../stores/types';

const date = (cardOne: VideoCard, cardTwo: VideoCard): number => {
  const dateOne = new Date(cardOne.snippet.publishedAt).getTime();
  const dateTwo = new Date(cardTwo.snippet.publishedAt).getTime();
  return dateTwo - dateOne;
};

const countOfViews = (cardOne: VideoCard, cardTwo: VideoCard): number => {
  const viewCountOne = cardOne.statistics.viewCount;
  const viewCountTwo = cardTwo.statistics.viewCount;
  return viewCountTwo - viewCountOne;
};

const bycountOccurrences = (cardOne: VideoCard, cardTwo: VideoCard, sortInput?: string): number => {
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
  (cardOne: VideoCard, cardTwo: VideoCard, sortInput?: string) => number
> = {
  [SortType.Date]: date,
  [SortType.CountOfViews]: countOfViews,
  [SortType.ByWordOrSentance]: bycountOccurrences,
};
