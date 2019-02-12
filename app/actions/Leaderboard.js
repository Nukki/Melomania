import axios from 'axios';
import {
  FETCH_LEADERS_BEGIN,
  FETCH_LEADERS_SUCCESS,
  FETCH_LEADERS_FAILURE,
} from './ActionTypes';
import { handleErrors } from './SongActions';


// action creators
export const fetchLeadersBegin = () => ({
  type: FETCH_LEADERS_BEGIN,
});

export const fetchLeadersSuccess = list => ({
  type: FETCH_LEADERS_SUCCESS,
  payload: { list },
});

export const fetchLeadersFailure = error => ({
  type: FETCH_LEADERS_FAILURE,
  payload: { error },
});

// thunk
export const fetchLeaderboard = () => {
  return (dispatch) => {
    dispatch(fetchLeadersBegin());
    return axios.get('/user/leaderboard')
      .then(handleErrors)
      .then((res) => {
        dispatch(fetchLeadersSuccess(res.data.data));
        return res.data.data;
      })
      .catch(error => dispatch(fetchLeadersFailure(error)));
  };
};
