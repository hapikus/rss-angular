import { CardType } from '@shared/components/cards/types';
import { Card, VideoCardWithDetails } from '@models/video-card.model';
import { FavoriteCard, CustomCard } from 'src/app/redux/state.model';
import { getPreviewImg } from './get-preview-img';

interface Props {
  videoId: string;
  stateVideos: VideoCardWithDetails[];
  stateFavorites: FavoriteCard[];
  stateCustom: CustomCard[];
}

export const getItemById = ({
  videoId,
  stateVideos,
  stateFavorites,
  stateCustom,
}: Props): Card | null => {
  if (Number.isFinite(+videoId)) {
    const item = stateCustom[+videoId];
    return {
      title: item.title,
      previewUrl: item.previewImage,
      description: item.description,
      publishDate: item.createDate,
      id: `${videoId}`,
      cardType: CardType.CustomCard,
    };
  }

  const filtredVideo = stateVideos.filter(
    (videoCard) => videoCard.id === videoId,
  );
  if (filtredVideo.length) {
    return {
      title: filtredVideo[0].snippet.title,
      statistics: filtredVideo[0].statistics,
      previewUrl: getPreviewImg(filtredVideo[0]),
      description: filtredVideo[0].snippet.description,
      publishDate: filtredVideo[0].snippet.publishedAt,
      id: filtredVideo[0].id,
      cardType: CardType.YouTube,
    };
  }

  const filtredFavorites = stateFavorites.filter(
    (favoriteVideo) => favoriteVideo.id === videoId,
  );
  if (filtredFavorites.length) {
    return {
      title: filtredFavorites[0].title,
      statistics: filtredFavorites[0].statistics,
      previewUrl: filtredFavorites[0].previewImage,
      description: filtredFavorites[0].description,
      publishDate: filtredFavorites[0].createDate,
      id: filtredFavorites[0].id,
      cardType: CardType.FavoriteCard,
    };
  }

  return null;
};
