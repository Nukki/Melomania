import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box, Text } from 'rebass';
import { clearSong } from '../actions/SongActions';
import { clearUser } from '../actions/UserActions';
import Medal from './icons/Medal';
import PlayMusic from './icons/PlayMusic';

class Home extends Component {
  componentDidMount() {
    // clear state in case browser back button was pushed to get here
    if (this.props.user.name) {
      this.props.clearUser();
      this.props.clearSong();
    }
  }

  render() {
    return (
      <Flex
        flexDirection={['column', 'column', 'row']}
        justifyContent="center"
        alignItems="center"
      >

        <Flex
          justifyContent="center"
          alignItems="center"
          color="white"
          bg="palegreen"
          mt={[0, 0, 4]}
          mb={[3, 3, 5]}
          ml={[0, 0, 5]}
          mr={[0, 0, 3]}
          width={3 / 4}
        >
          <Link to="/name" className="wrapper">
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              <PlayMusic />
              <Text
                mt={[3, 4, 5]}
                fontSize={[2, 3, 4]}
                fontFamily="Menlo, monospace"
              >
                Start Game
              </Text>
            </Flex>
          </Link>
        </Flex>

        <Flex
          justifyContent="center"
          alignItems="center"
          color="white"
          bg="aquamarine"
          width={3 / 4}
          mt={[0, 0, 4]}
          mb={[3, 3, 5]}
          ml={[0, 0, 3]}
          mr={[0, 0, 5]}
        >
          <Link to="/leaderboard" className="wrapper">
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              <Medal />
              <Text
                mt={[3, 4, 5]}
                fontSize={[2, 3, 4]}
                fontFamily="Menlo, monospace"
              >
                Leaderboard
              </Text>
            </Flex>
          </Link>
        </Flex>

      </Flex>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  clearSong,
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
