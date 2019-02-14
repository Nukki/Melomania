import React, { Component } from 'react';
import { Flex, Box, Text } from 'rebass';

export default class Footer extends Component {
  render() {
    return (
      <Text
        fontSize={[0, 1, 1]}
        fontFamily="Menlo, monospace"
        color="dimgray"
        p={1}
      >
        Made with <span role="img"aria-label="music">🎶</span> by Nikki Jack &copy; 2019
      </Text>
    );
  }
}
