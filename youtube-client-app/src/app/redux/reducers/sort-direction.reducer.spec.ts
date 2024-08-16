import { AppStore, SortDirection } from '../state.model';
import { initialStore } from '../state';
import { sortDirectionAsc, sortDirectionDesc } from '../actions/sort-direction.actions';
import { sortDirectionReducer } from './sort-direction.reducer';

describe('customCardsReducer', () => {
  let mockInitialState: AppStore;

  beforeEach(() => {
    mockInitialState = {
      ...initialStore,
    };
  });

  it('should set sort direction to ASC when sortDirectionAsc action is dispatched', () => {
    const action = sortDirectionAsc();
    const state = sortDirectionReducer(mockInitialState, action);

    expect(state.sortDirection).toEqual(SortDirection.ASC);
  });

  it('should set sort direction to DESC when sortDirectionDesc action is dispatched', () => {
    const action = sortDirectionDesc();
    const state = sortDirectionReducer(mockInitialState, action);

    expect(state.sortDirection).toEqual(SortDirection.DESC);
  });
});
