import { combineReducers } from 'redux';
import nameReducer from './reducer_example';

const rootReducer = combineReducers({
  name: nameReducer,
});

export default rootReducer;
