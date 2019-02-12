import {
  FETCH_LEADERS_BEGIN,
  FETCH_LEADERS_SUCCESS,
  FETCH_LEADERS_FAILURE,
} from '../actions/ActionTypes';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LEADERS_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        loading: false,
        error: null,
      };
    case FETCH_LEADERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
