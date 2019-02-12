import {
  CHECK_ANSWER_BEGIN,
  CHECK_ANSWER_SUCCESS,
  CHECK_ANSWER_FAILURE,
  CLEAR_ANSWER } from '../actions/ActionTypes';

const initialState = {
  right: false,
  artist: null,
  songName: null,
  loading: false,
  plusScore: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_ANSWER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHECK_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        artist: action.payload.answer.artist,
        songName: action.payload.answer.songName,
        right: action.payload.answer.right,
        plusScore: action.payload.answer.plusScore,
      };
    case CHECK_ANSWER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_ANSWER:
      return initialState;
    default:
      return state;
  }
};


// artist: action.payload.answer.artist,
// songName: action.payload.answer.songName,
// right: action.payload.answer.right,
