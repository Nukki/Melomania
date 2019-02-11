import axios from 'axios';
import { FETCH_SONG_BEGIN, FETCH_SONG_SUCCESS, FETCH_SONG_FAILURE } from './ActionTypes';

/*
  Song
  {
    songUrl: 'song_url',
    answerOptions: ['Madonna', 'Britney', 'Nicky', 'Cardi'],
    genreCode: '02',
    playlistIndex: 12,
  }
*/

// action creators
export const fetchSongBegin = () => ({
  type: FETCH_SONG_BEGIN
});

export const fetchSongSuccess = song => ({
  type: FETCH_SONG_SUCCESS,
  payload: { song }
});

export const fetchSongFailure = error => ({
  type: FETCH_SONG_FAILURE,
  payload: { error }
});

// thunks
export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return axios.get('/newSong')
      .then(handleErrors)
      .then(res => {
        dispatch(fetchProductsSuccess(res.data.data));
        return res.data.data;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

// Handle HTTP errors
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
