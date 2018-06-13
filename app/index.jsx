/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

import '../public/style/style.css';
import MainContainer from './components/MainContainer';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={MainContainer} />
      </div>
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
