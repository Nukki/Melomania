import { SET_NAME, CLEAR_NAME } from '../actions/ActionTypes';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return action.payload;
    case CLEAR_NAME:
      return initialState;
    default:
      return state;
  }
};
