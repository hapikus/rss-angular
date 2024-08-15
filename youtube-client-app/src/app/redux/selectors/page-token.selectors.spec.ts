import { AppStore, PageTokenKey } from '../state.model';
import { initialStore } from '../state';
import { selectPageTokenByType, selectPageTokenFeature, selectPageTokens } from './page-token.selector';

describe('PageToken Selectors', () => {
  let mockInitialState: AppStore;

  beforeEach(() => {
    mockInitialState = {
      ...initialStore,
      pageTokens: {
        [PageTokenKey.Prev]: 'prevPageToken',
        [PageTokenKey.Next]: 'nextPageToken',
      },
    };
  });

  it('should select the feature state', () => {
    const result = selectPageTokenFeature.projector(mockInitialState);
    expect(result).toEqual(mockInitialState);
  });

  it('should select all page tokens', () => {
    const result = selectPageTokens.projector(mockInitialState);
    expect(result).toEqual(mockInitialState.pageTokens);
  });

  it('should select the page token by type (Prev)', () => {
    const result = selectPageTokenByType(PageTokenKey.Prev).projector(mockInitialState);
    expect(result).toBe('prevPageToken');
  });

  it('should select the page token by type (Next)', () => {
    const result = selectPageTokenByType(PageTokenKey.Next).projector(mockInitialState);
    expect(result).toBe('nextPageToken');
  });
});
