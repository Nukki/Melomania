import React, { Component } from 'react';
import { Flex } from 'rebass';
import JustText from '../styled/JustText';

export default class HomeInstructions extends Component {
  render() {
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        py={[1, 3, 4]}
        px={4}
      >
        <JustText
          fontSize={[1, 3, 3]}
          color="lavenderblush"
          flex={2}
        >
          Are you a fan of ALL music?
          Can you recognize a song faster than Shazam?
        </JustText>
        <JustText
          fontSize={[1, 3, 3]}
          color="lavenderblush"
          flex={1}
        >
          Test your music knowledge right now!
        </JustText>
      </Flex>
    );
  }
}
