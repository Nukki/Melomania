import axios from 'axios';
import {
  CHECK_ANSWER_BEGIN,
  CHECK_ANSWER_SUCCESS,
  CHECK_ANSWER_FAILURE,
  CLEAR_ANSWER } from './ActionTypes';
import { handleErrors } from './SongActions';
import { updateUser } from './UserActions';

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
export const getAnswer = (oldScore, name, answer, genreCode, playlistIndex) => {
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
        const newScore = oldScore + data.plusScore;
        if (data.right) {
          dispatch(updateUser(newScore));
          axios.post('user/update', { name, score: newScore })
            .catch(err => console.log(err));
        }
        return data;
      })
      .catch(error => dispatch(checkAnswerFailure(error)));
  };
};
