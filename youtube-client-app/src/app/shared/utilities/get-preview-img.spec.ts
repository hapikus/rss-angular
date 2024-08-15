import { VideoCardWithDetails } from '@models/video-card.model';
import { getPreviewImg } from './get-preview-img';

const videoCardMock = {
  snippet: {
    thumbnails: {
      default: { url: 'http://example.com/default.jpg', width: 120, height: 90 },
      medium: { url: 'http://example.com/medium.jpg', width: 320, height: 180 },
      high: { url: 'http://example.com/high.jpg', width: 480, height: 360 },
      standard: { url: 'http://example.com/standard.jpg', width: 640, height: 480 },
      maxres: { url: 'http://example.com/maxres.jpg', width: 1280, height: 720 },
    },
  },
} as unknown as VideoCardWithDetails;

describe('getPreviewImg', () => {
  let videoCard: VideoCardWithDetails;

  beforeEach(() => {
    videoCard = videoCardMock;
  });

  it('should return the URL of the highest resolution image', () => {
    const result = getPreviewImg(videoCard);
    expect(result).toBe('http://example.com/maxres.jpg');
  });

  it('should return the URL of a lower resolution image if no higher resolution is available', () => {
    delete videoCard.snippet.thumbnails['maxres'];
    const result = getPreviewImg(videoCard);
    expect(result).toBe('http://example.com/standard.jpg');
  });

  it('should return an empty string if no thumbnails are available', () => {
    videoCard.snippet.thumbnails = {};
    const result = getPreviewImg(videoCard);
    expect(result).toBe('');
  });
});
