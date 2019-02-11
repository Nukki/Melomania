import { SET_USER, CLEAR_USER, UPDATE_SCORE } from '../actions/ActionTypes';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UPDATE_SCORE:
      return action.payload; // TODO
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
