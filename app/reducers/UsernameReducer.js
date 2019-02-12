import { SET_USER, CLEAR_USER, UPDATE_SCORE } from '../actions/ActionTypes';

const initialState = {
  name: null,
  score: 0,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        name: action.payload.name,
        score: action.payload.score,
        error: null,
      };
    case UPDATE_SCORE:
      return {
        ...state,
        score: action.playload,
        error: null,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return { ...state };
  }
};
