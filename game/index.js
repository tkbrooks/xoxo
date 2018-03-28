import { Map } from 'immutable';
import { createStore } from 'redux';

const initialState = {
  board: Map(),
  turn: 'X'
};

const MOVE = 'MOVE';

export const move = (turn, position) => {
  return { type: MOVE, position };
};

export default function gameReducer(state = initialState, action) {
  if (action.type === MOVE) {
    state.board = state.board.setIn(action.position, state.turn);
    state.turn === 'X'
      ? (state.turn = 'O')
      : (state.turn = 'X');
  }
  return state;
}
