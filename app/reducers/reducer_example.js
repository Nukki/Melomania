import { GET_NAME } from '../actions';

export default function (state = 'Nukki', action) {
  switch (action.type) {
    case GET_NAME:
      return action.payload;
    default:
      return state;
  }
}
