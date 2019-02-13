import React, { Component } from 'react';
import { Flex, Box, Text } from 'rebass';

export default class Header extends Component {
  render() {
    return (
      <Text
        fontSize={[3, 4, 5]}
        fontWeight="bold"
        textAlign="center"
        color="magenta"
      >
        Melomaniac
      </Text>
    );
  }
}
