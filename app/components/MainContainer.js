import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box, Text } from 'rebass';
import { clearSong } from '../actions/SongActions';
import { clearUser } from '../actions/UserActions';

class MainContainer extends Component {
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
        flexDirection="column"
        justifyContent="center"
        css={{ flex: 1 }}
      >
        <Box
          p={2}
          color="magenta"
          bg="black"
          css={{ height: '45%' }}
        >
          <Link to="/name"> Play </Link>
        </Box>
        <Box
          p={2}
          color="white"
          bg="magenta"
          css={{ height: '45%' }}
        >
          <Link to="/leaderboard"> Leaderboard </Link>
        </Box>
      </Flex>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  clearSong,
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
