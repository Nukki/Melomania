/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import store from './store';

import '../public/style/style.css';
import Header from './components/dontchange/Header';
import Footer from './components/dontchange/Footer';
import MainContainer from './components/MainContainer';
import SongGuesser from './components/SongGuesser';
import GuessResult from './components/GuessResult';
import Leaderboard from './components/Leaderboard';
import EnterName from './components/EnterName';


ReactDOM.render(
  <Flex flexDirection="column" justifyContent="space-between" >
    <Box flex={2}>
      <Header />
    </Box>
    <Box flex={22}>
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={MainContainer} />
            <Route path="/guess" component={SongGuesser} />
            <Route path="/result" component={GuessResult} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/name" component={EnterName} />
          </div>
        </Router>
      </Provider>
    </Box>
    <Box flex={1}>
      <Footer />
    </Box>
  </Flex>,
  document.querySelector('#root'),
);
