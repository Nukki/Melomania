import React, { Component } from 'react';
import JustText from '../styled/JustText';

export default class Footer extends Component {
  render() {
    return (
      <JustText
        fontSize={[0, 1, 1]}
        color="dimgray"
        p={1}
      >
        Made with <span role="img" aria-label="music">🎶</span> by Nikki Jack &copy; 2019
      </JustText>
    );
  }
}
