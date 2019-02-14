/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import store from './store';

import '../public/style/style.css';
import Octocat from './components/icons/Octocat';
import Header from './components/dontchange/Header';
import Footer from './components/dontchange/Footer';
import Home from './components/Home';
import SongGuesser from './components/SongGuesser';
import GuessResult from './components/GuessResult';
import Leaderboard from './components/Leaderboard';
import EnterName from './components/EnterName';


ReactDOM.render(
  <Box bg="lightseagreen">
    <Octocat />
    <Flex flexDirection="column" justifyContent="space-around" >
      <Box flex={5}>
        <Header />
      </Box>
      <Box flex={26}>
        <Provider store={store}>
          <Router>
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/guess" component={SongGuesser} />
              <Route path="/result" component={GuessResult} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/name" component={EnterName} />
            </div>
          </Router>
        </Provider>
      </Box>
      <Flex flex={2} alignItems="center" justifyContent="center">
        <Footer />
      </Flex>
    </Flex>
  </Box>,
  document.querySelector('#root'),
);
