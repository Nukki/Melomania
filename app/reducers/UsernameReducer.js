import { SET_USER, CLEAR_USER, UPD_USER } from '../actions/ActionTypes';

const initialState = {
  name: null,
  points: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        name: action.payload.name,
      };
    case UPD_USER:
      return {
        ...state,
        points: action.payload.points,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
