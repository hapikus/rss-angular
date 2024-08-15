import { AppStore } from '../state.model';
import { initialStore } from '../state';
import { decreasePageNumber, increasePageNumber, resetPageNumber } from '../actions/page-number.actions';
import { pageNumberReducer } from './page-number.reducer';

describe('customCardsReducer', () => {
  let mockInitialState: AppStore;

  beforeEach(() => {
    mockInitialState = {
      ...initialStore,
    };
  });

  it('should increase page number when increasePageNumber action is dispatched', () => {
    const action = increasePageNumber();
    const state = pageNumberReducer(mockInitialState, action);

    expect(state.pageNumber).toEqual(2);
  });

  it('should decrease page number when decreasePageNumber action is dispatched', () => {
    const actionIncrease = increasePageNumber();
    let state = pageNumberReducer(mockInitialState, actionIncrease);
    state = pageNumberReducer(state, actionIncrease);
    expect(state.pageNumber).toEqual(3);

    const action = decreasePageNumber();
    state = pageNumberReducer(state, action);

    expect(state.pageNumber).toEqual(2);
  });

  it('should reset page number when resetPageNumber action is dispatched', () => {
    const actionIncrease = increasePageNumber();
    let state = pageNumberReducer(mockInitialState, actionIncrease);
    state = pageNumberReducer(state, actionIncrease);
    expect(state.pageNumber).toEqual(3);

    const action = resetPageNumber();
    state = pageNumberReducer(state, action);

    expect(state.pageNumber).toEqual(1);
  });
});
