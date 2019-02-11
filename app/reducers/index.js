import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './UsernameReducer';
import modalReducer from './ModalReducer';
import songReducer from './SongReducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  modal: modalReducer,
  song: songReducer,
});

export default rootReducer;
