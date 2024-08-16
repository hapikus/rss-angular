import { Action } from '@ngrx/store';
import { addCustomCard, removeCustomCard } from '../actions/custom-card.actions';
import { AppStore, CustomCard } from '../state.model';
import { initialStore } from '../state';
import { customCardsReducer } from './custom-card.reducer';

const customCardOneMock = { id: 1, title: 'Test Card' } as unknown as CustomCard;
const customCardTwoMock = { id: 2, title: 'Test Card 2' } as unknown as CustomCard;

const enum ActionsMock {
  unknownAction = 'UNKNOWN_ACTION',
}

describe('customCardsReducer', () => {
  let mockInitialState: AppStore;

  beforeEach(() => {
    mockInitialState = {
      ...initialStore,
      customCards: [],
    };
  });

  it('should add a custom card when addCustomCard action is dispatched', () => {
    const customCard = customCardOneMock;
    const action = addCustomCard({ customCard });
    const state = customCardsReducer(mockInitialState, action);

    expect(state.customCards.length).toBe(1);
    expect(state.customCards[0]).toEqual(customCard);
  });

  it('should remove a custom card when removeCustomCard action is dispatched', () => {
    const customCard1 = customCardOneMock;
    const customCard2 = customCardTwoMock;
    const modifiedState: AppStore = {
      ...mockInitialState,
      customCards: [customCard1, customCard2],
    };

    const action = removeCustomCard({ index: 0 });
    const state = customCardsReducer(modifiedState, action);

    expect(state.customCards.length).toBe(1);
    expect(state.customCards[0]).toEqual(customCard2);
  });

  it('should return the initial state when an unknown action is dispatched', () => {
    const action = { type: ActionsMock.unknownAction } as unknown as Action;
    const state = customCardsReducer(mockInitialState, action);

    expect(state).toEqual(mockInitialState);
  });
});
