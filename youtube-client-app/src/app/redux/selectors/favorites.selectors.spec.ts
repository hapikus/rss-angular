import {
  selectFavoriteFeature,
  selectFavorites,
  selectIsFavorite,
  selectFavoriteCount,
} from './favorites.selector';
import { AppStore, FavoriteCard } from '../state.model';
import { initialStore } from '../state';

describe('Favorite Selectors', () => {
  let mockInitialState: AppStore;

  beforeEach(() => {
    mockInitialState = {
      ...initialStore,
      favorites: [
        { id: '1', title: 'Video 1' } as unknown as FavoriteCard,
        { id: '2', title: 'Video 2' } as unknown as FavoriteCard,
        { id: '3', title: 'Video 3' } as unknown as FavoriteCard,
      ],
    };
  });

  it('should select the favorites feature state', () => {
    const result = selectFavoriteFeature.projector(mockInitialState);
    expect(result).toEqual(mockInitialState);
  });

  it('should select all favorites', () => {
    const result = selectFavorites.projector(mockInitialState);
    expect(result).toEqual(mockInitialState.favorites);
  });

  it('should return true if a video is a favorite', () => {
    const videoId = '1';
    const result = selectIsFavorite(videoId).projector(mockInitialState);
    expect(result).toBe(true);
  });

  it('should return false if a video is not a favorite', () => {
    const videoId = '4';
    const result = selectIsFavorite(videoId).projector(mockInitialState);
    expect(result).toBe(false);
  });

  it('should return the count of favorite videos', () => {
    const result = selectFavoriteCount.projector(mockInitialState.favorites);
    expect(result).toBe(3);
  });
});
