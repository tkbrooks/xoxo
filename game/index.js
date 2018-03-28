import { Map } from 'immutable';
import { createStore } from 'redux';

const initialState = {
  board: Map(),
  turn: 'X'
};

const MOVE = 'MOVE';

function winner(board, [x, y]) {
  let horizontal = streak(board, [x, 0], [x, 1], [x, 2])
  let vertical = streak(board, [0, y], [1, y], [2, y])
  let diag1 = streak(board, [0, 0], [1, 1], [2, 2])
  let diag2 = streak(board, [0, 2], [1, 1], [2, 0])

  if (horizontal) { return horizontal }
  if (vertical) { return vertical }
  if (diag1) { return diag1 }
  if (diag2) { return diag2 }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board.hasIn([i, j])) {
        return null
      }
    }
  }

  return 'draw'
}

function streak(board, coord1, coord2, coord3) {
  if (board.getIn(coord1) === board.getIn(coord2) && board.getIn(coord1) === board.getIn(coord3)) {
    return board.getIn(coord1)
  }
}

export const move = (turn, position) => {
  return { type: MOVE, position, turn };
};
function turnReducer(turn = 'X', action) {
  if (action.type === MOVE) {
    return turn === 'X' ? 'O' : 'X';
  }
  return turn
}
function boardReducer(board = Map(), action) {
  if (action.type === MOVE) {
    return board.setIn(action.position, action.turn);
  }
  return board
}

export default function gameReducer(state = initialState, action) {
  const newTurn = turnReducer(state.turn, action)
  const newBoard = boardReducer(state.board, action)
  if(action.type === 'MOVE'){
    console.log(winner(newBoard, action.position))
  }
  return {board: newBoard, turn: newTurn};
}
