import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Flex, Box, Text } from 'rebass';
import UserFace from './icons/UserFace';
import NameForm from './form/NameForm';

class EnterName extends Component {
  render() {
    const { user } = this.props;
    if (user.name) {
      return <Redirect to="/guess" />;
    }
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
      >

        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="center"
          flex={4}
        >
          <Box flex={[1, 1, 2]} />
          <UserFace flex={[4, 3, 3]} />
          <Box flex={[1, 1, 2]} />
          <Text
            flex={1}
            mb={[2, 3, 3]}
            fontSize={[3, 4, 4]}
            fontFamily="Menlo, monospace"
          >
            Please Enter Your Name
          </Text>
        </Flex>

        <Flex flex={2}>
          <NameForm />
        </Flex>

      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(EnterName);
