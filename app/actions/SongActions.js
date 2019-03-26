import axios from 'axios';
import {
  FETCH_SONG_BEGIN,
  FETCH_SONG_SUCCESS,
  FETCH_SONG_FAILURE,
  CLEAR_SONG } from './ActionTypes';

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
  type: FETCH_SONG_BEGIN,
});

export const fetchSongSuccess = song => ({
  type: FETCH_SONG_SUCCESS,
  payload: { song },
});

export const fetchSongFailure = error => ({
  type: FETCH_SONG_FAILURE,
  payload: { error },
});

export const clearSong = () => ({
  type: CLEAR_SONG,
});

// Handle HTTP errors
export const handleErrors = (response) => {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }
  return response;
};

// thunks
export const fetchSong = () => {
  return (dispatch) => {
    dispatch(fetchSongBegin());
    return axios.get('/user/newSong')
      .then(handleErrors)
      .then((res) => {
        dispatch(fetchSongSuccess(res.data.data));
        return res.data.data;
      })
      .catch(error => dispatch(fetchSongFailure(error)));
  };
};
