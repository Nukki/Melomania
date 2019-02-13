import React, { Component } from 'react';
import { Flex, Box, Text } from 'rebass';

export default class Footer extends Component {
  render() {
    return (
      <Text
        fontSize={[1]}
        fontWeight="bold"
        textAlign="center"
        color="magenta"
      >
        Footer text
      </Text>
    );
  }
}
