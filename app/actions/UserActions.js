import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { SET_USER, CLEAR_USER, UPD_USER } from './ActionTypes';
import { handleErrors } from './SongActions';

// action creators
export const setUser = (name, score) => ({
  type: SET_USER,
  payload: { name, score },
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const updateUser = newPoints => ({
  type: UPD_USER,
  payload: { points: newPoints },
});

/* thunks
export const getTheName = () => dispatch => (
  axios.get('/api')
    .then(res => dispatch(gotName(res.data)))
    .catch(err => console.error(err))
);
*/

// thunks
export const submitUserForm = (values, dispatch) => (
  axios.post('/user/create', { name: values.username })
    .then((response) => {
      if (response.data.data.error) { // username is taken
        throw new SubmissionError({ _error: response.data.data.error });
      } else { // success
        console.log(response);
        dispatch(setUser(response.data.data.name, response.data.data.score));
      }
    })
);

// export const checkAnswer = (oldScore, answer, genreCode, playlistIndex) => {
//   return dispatch => (
//     axios.post('/user/checkAnswer', { answer, genreCode, playlistIndex })
//       .then(handleErrors)
//       .then((res) => {
//         if (res.data.data.right) dispatch(updateScore(res.data.data.plusScore + oldScore));
//         return res.data.data;
//       })
//       .catch(error => dispatch(answerCheckFailure(error)))
//   );
// };
