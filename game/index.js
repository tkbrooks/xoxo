import { Map } from 'immutable';
import { createStore } from 'redux';

const initialState = {
  board: Map(),
  turn: 'X',
  winner: null
};

const MOVE = 'MOVE';

function winner(board, position = [0, 0]) {
  const x = position[0];
  const y = position[1];
  let horizontal = streak(board, [x, 0], [x, 1], [x, 2]);
  let vertical = streak(board, [0, y], [1, y], [2, y]);
  let diag1 = streak(board, [0, 0], [1, 1], [2, 2]);
  let diag2 = streak(board, [0, 2], [1, 1], [2, 0]);

  if (horizontal) {
    return horizontal;
  }
  if (vertical) {
    return vertical;
  }
  if (diag1) {
    return diag1;
  }
  if (diag2) {
    return diag2;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board.hasIn([i, j])) {
        return null;
      }
    }
  }

  return 'draw';
}

function streak(board, coord1, coord2, coord3) {
  if (
    board.getIn(coord1) === board.getIn(coord2) &&
    board.getIn(coord1) === board.getIn(coord3)
  ) {
    return board.getIn(coord1);
  }
}

export const move = (turn, position) => {
  return { type: MOVE, position, turn };
};

function turnReducer(turn = 'X', action) {
  if (action.type === MOVE) {
    return turn === 'X' ? 'O' : 'X';
  }
  return turn;
}

function boardReducer(board = Map(), action) {
  if (action.type === MOVE) {
    return board.setIn(action.position, action.turn);
  }
  return board;
}

const bad = (state, { position = [0, 0], turn = 'X' }) => {
  const x = position[0];
  const y = position[1];
  if (turn !== state.turn) return {error: 'Not your turn'};
  if (x > 2 || x < 0 || y > 2 || y < 0) return {error: 'Invalid position'};
  if (state.board.hasIn(position)) return {error: 'You already played there'};
};

export default function gameReducer(state = initialState, action) {
  const error = bad(state, action);
  if (error) return Object.assign({}, state, error);

  const newBoard = boardReducer(state.board, action);
  const winnerState = winner(newBoard, action.position);
  const newTurn = turnReducer(state.turn, action);
  return { board: newBoard, turn: newTurn, winner: winnerState };
}
