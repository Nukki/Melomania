import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Button } from 'rebass';
import ButtonOutline from './styled/ButtonOutline';
import JustText from './styled/JustText';
import CenteredText from './styled/CenteredText';
import { fetchLeaderboard } from '../actions/Leaderboard';

const showRow = (index, name, score) => (
  <Flex key={name} justifyContent="space-evenly" width={[3 / 4, 3 / 4, 1 / 2]} mx="auto">
    <CenteredText flex={1} >{index}.</CenteredText>
    <JustText flex={3} >{name}</JustText>
    <CenteredText flex={1} >{score}</CenteredText>
  </Flex>
);

class Leaderboard extends Component {
  componentDidMount() {
    this.props.fetchLeaderboard();
  }

  render() {
    const { leaders, loading, error } = this.props;
    return (
      <Flex flexDirection="column" justifyContent="space-between" >
        <CenteredText flex={1}>
           Top Players
        </CenteredText>

        <Flex
          flexDirection="column"
          alignSelf="center"
          flex={10}
          bg="slateblue"
          width={[3 / 4, 1 / 2, 2 / 5]}
          py={[2, 4]}
          mb={2}
        >
          {
          leaders && !loading && leaders.map((user, i) => (
            showRow(i + 1, user.name, user.score)
          ))
          }
        </Flex>

        <Flex flex={2} justifyContent="center" alignItems="center">
          <Link flex={3} to="/name"><ButtonOutline>Start Game</ButtonOutline></Link>
        </Flex>
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  leaders: state.leaders.list,
  loading: state.leaders.loading,
  error: state.leaders.error,
});

export default connect(mapStateToProps, { fetchLeaderboard })(Leaderboard);
