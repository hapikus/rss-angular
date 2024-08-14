import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardType } from '@shared/components/cards/types';
import { previewImg } from '@shared/utilities/preview-img';
import { AppStore } from '../state.model';
import { selectFavorites } from './favorites.selector';
import { selectCustomCards } from './custom-card.selector';

export const selectVideosFeature = createFeatureSelector<AppStore>('videos');

export const selectVideos = createSelector(
  selectVideosFeature,
  (state: AppStore) => state.videos,
);

export const selectVideoById = (videoId: string) => createSelector(
  selectVideosFeature,
  (state: AppStore) => state.videos.filter((item) => item.id === videoId)[0],
);

export const selectItemForDetails = (videoId: string) => createSelector(
  selectVideos,
  selectFavorites,
  selectCustomCards,
  (stateVideos, stateFavorites, stateCustom) => {
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

    const filtredVideo = stateVideos.filter((videoCard) => videoCard.id === videoId);
    if (filtredVideo.length) {
      return {
        title: filtredVideo[0].snippet.title,
        statistics: filtredVideo[0].statistics,
        previewUrl: previewImg(filtredVideo[0]),
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
  },
);
