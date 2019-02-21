import React, { Component } from 'react';
import { Flex, Box } from 'rebass';
// import CenteredText from '../styled/CenteredText';
import JustText from '../styled/JustText';
import Hand from '../icons/Hand';

export default class Header extends Component {
  render() {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="row" alignItems="center" justifyContent="flex-end">
          <JustText
            flex={3}
            pt={['6.5vh', '5.5vh', 4]}
            fontSize={[4, 6, 6]}
            fontWeight="bold"
          >
            MELOMANIA
          </JustText>
          <Hand flex={3} />
        </Flex>

      </Flex>
    );
  }
}
