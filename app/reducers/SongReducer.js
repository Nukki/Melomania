import {
  FETCH_SONG_BEGIN,
  FETCH_SONG_SUCCESS,
  FETCH_SONG_FAILURE,
  CLEAR_SONG } from '../actions/ActionTypes';

const initialState = {
  song: null,
  loading: false,
  error: null,
};

/*
  song
  {
    songUrl: 'song_url',
    answerOptions: ['Madonna', 'Britney', 'Nicky', 'Cardi'],
    genreCode: '02',
    playlistIndex: 12,
  }
*/

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONG_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        song: action.payload.song,
      };
    case FETCH_SONG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        song: null,
      };
    case CLEAR_SONG:
      return initialState;
    default:
      return state;
  }
};
