import axios from 'axios';
import {
  CHECK_ANSWER_BEGIN,
  CHECK_ANSWER_SUCCESS,
  CHECK_ANSWER_FAILURE,
  CLEAR_ANSWER } from './ActionTypes';
import { handleErrors } from './SongActions';
import { updateScore } from './UserActions';

// action creators
export const checkAnswerBegin = () => ({
  type: CHECK_ANSWER_BEGIN,
});

export const checkAnswerSuccess = answer => ({
  type: CHECK_ANSWER_SUCCESS,
  payload: { answer },
});

export const checkAnswerFailure = error => ({
  type: CHECK_ANSWER_FAILURE,
  payload: { error },
});

export const clearAnswer = () => ({
  type: CLEAR_ANSWER,
});

// thunks
export const getAnswer = (oldScore, answer, genreCode, playlistIndex) => {
  console.log('=============================== ', oldScore);
  return (dispatch) => {
    dispatch(checkAnswerBegin());
    return axios.post('/user/checkAnswer', { answer, genreCode, playlistIndex })
      .then(handleErrors)
      .then((res) => {
        dispatch(checkAnswerSuccess(res.data.data));
        // if (res.data.data.right) dispatch(updateScore(oldScore + res.data.data.plusScore));
        return res.data.data;
      })
      .then((data) => {
        if (data.right) dispatch(updateScore(oldScore + data.plusScore));
        return data;
      })
      .catch(error => dispatch(checkAnswerFailure(error)));
  };
};