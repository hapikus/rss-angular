import { VideoCard } from '@models/video-card.model';

export const getIds = (dataCurrent: VideoCard[]): string[] =>
  Array.from(
    dataCurrent.reduce((acc, item) => {
      if (!item.statistics) {
        acc.add(item.id.videoId);
      }
      return acc;
    }, new Set()),
  ) as string[];
