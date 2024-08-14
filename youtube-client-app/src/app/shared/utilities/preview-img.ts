import { VideoCardWithDetails } from '@models/video-card.model';

export const previewImg = (videoCard: VideoCardWithDetails): string => {
  const result = {
    width: 0,
    url: '',
  };

  Array.from(Object.values(videoCard.snippet.thumbnails)).forEach((item) => {
    const { width, url } = item;
    if (+width > result.width) {
      result.width = width;
      result.url = url;
    }
  });
  return result.url;
};
