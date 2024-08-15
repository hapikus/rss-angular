import { VideoCardWithDetails } from '@models/video-card.model';
import { SortType } from 'src/app/redux/state.model';
import { sortMapItems } from './sort-map-items';

describe('Sort Utilities', () => {
  let cardOne: VideoCardWithDetails;
  let cardTwo: VideoCardWithDetails;

  beforeEach(() => {
    cardOne = {
      snippet: {
        publishedAt: '2023-01-01T12:00:00Z',
        description: 'This is a test video description with test word.',
      },
      statistics: {
        viewCount: '100',
      },
    } as unknown as VideoCardWithDetails;

    cardTwo = {
      snippet: {
        publishedAt: '2023-01-02T12:00:00Z',
        description: 'Another test video description with another test word.',
      },
      statistics: {
        viewCount: '200',
      },
    } as unknown as VideoCardWithDetails;
  });

  it('should sort videos by date in descending order', () => {
    const result = sortMapItems[SortType.Date](cardOne, cardTwo);
    expect(result).toBeGreaterThan(0);
  });

  it('should sort videos by view count in descending order', () => {
    const result = sortMapItems[SortType.CountOfViews](cardOne, cardTwo);
    expect(result).toBeGreaterThan(0);
  });

  it('should sort videos by the number of occurrences of a search term in the description', () => {
    const sortInput = 'test';
    const result = sortMapItems[SortType.ByWordOrSentance](cardOne, cardTwo, sortInput);
    expect(result).toBe(0);
  });

  it('should return 0 if no sortInput is provided for bycountOccurrences', () => {
    const result = sortMapItems[SortType.ByWordOrSentance](cardOne, cardTwo);
    expect(result).toBe(0);
  });
});
