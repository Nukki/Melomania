import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';


const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
export default store;
