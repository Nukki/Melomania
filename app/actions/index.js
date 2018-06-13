// import axios from 'axios';

// action types
export const GET_NAME = 'GET_NAME';

// action creators
export function gotName(data) {
  return {
    type: GET_NAME,
    payload: data,
  };
}

/* thunks
export const getTheName = () => dispatch => (
  axios.get('/api')
    .then(res => dispatch(gotName(res.data)))
    .catch(err => console.error(err))
);
*/
