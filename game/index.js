import {Map} from 'immutable'
import { createStore } from 'redux'

const initialState = {
  board: Map(),
  turn: "X"
}

const move = () => reducer.dispatch({type: "MOVE", position: [row: 0, col: 0]})

export default function reducer(state = initialState, action) {
  // TODO

  return state
}
