import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import { clearSong } from '../actions/SongActions';
import { clearUser } from '../actions/UserActions';
import Medal from './icons/Medal';
import PlayMusic from './icons/PlayMusic';
import JustText from './styled/JustText';
import HomeInstructions from './dontchange/HomeInstructions';

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
      <Flex flexDirection="column" justifyContent="space-around">
        <Box flex={[2, 2, 2]}>
          <HomeInstructions />
        </Box>

        <Flex
          flexDirection={['column', 'column', 'row']}
          justifyContent="center"
          alignItems="center"
          flex={[3, 4, 4]}
        >

          <Flex
            justifyContent="center"
            alignItems="center"
            color="white"
            bg="mediumpurple"
            mt={[0, 0, 4]}
            pt={[0, 0, 4]}
            mb={[3, 3, 6]}
            ml={[0, 0, 6]}
            mr={[0, 0, 4]}
            width={3 / 4}
          >
            <Link to="/name" className="wrapper">
              <Flex flexDirection={['row', 'column', 'column']} justifyContent="center" alignItems="center">
                <PlayMusic />
                <JustText
                  mt={[0, 4, 4]}
                  ml={[2, 0, 0]}
                  fontSize={[2, 3, 4]}
                >
                  Start Game
                </JustText>
              </Flex>
            </Link>
          </Flex>

          <Flex
            justifyContent="center"
            alignItems="center"
            color="white"
            bg="slateblue"
            width={3 / 4}
            mt={[0, 0, 4]}
            pt={[0, 0, 4]}
            mb={[3, 3, 6]}
            ml={[0, 0, 4]}
            mr={[0, 0, 6]}
          >
            <Link to="/leaderboard" className="wrapper">
              <Flex flexDirection={['row', 'column', 'column']} justifyContent="center" alignItems="center">
                <Medal />
                <JustText
                  mt={[0, 4, 4]}
                  ml={[2, 0, 0]}
                  fontSize={[2, 3, 4]}
                >
                  Leaderboard
                </JustText>
              </Flex>
            </Link>
          </Flex>

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
