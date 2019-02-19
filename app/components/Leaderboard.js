import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Button } from 'rebass';
import ButtonOutline from './styled/ButtonOutline';
import { fetchLeaderboard } from '../actions/Leaderboard';

const showRow = (index, name, score) => (
  <Flex justifyContent="space-evenly" width={[3 / 4, 3 / 4, 1 / 2]} mx="auto">
    <Text flex={1} textAlign="center" fontFamily="Menlo, monospace">{index}.</Text>
    <Text flex={3} fontFamily="Menlo, monospace">{name}</Text>
    <Text flex={1} textAlign="center" fontFamily="Menlo, monospace">{score}</Text>
  </Flex>
);

class Leaderboard extends Component {
  componentDidMount() {
    this.props.fetchLeaderboard();
  }

  render() {
    const { leaders, loading, error } = this.props;
    return (
      <Flex flexDirection="column" color="#FFF">
        <Text flex={2} textAlign="center" fontFamily="Menlo, monospace">
           Top Players
        </Text>
        <Flex flexDirection="column" flex={10}>
          {
          leaders && !loading && leaders.map((user, i) => (
            showRow(i + 1, user.name, user.score)
          ))
          }
        </Flex>
        <Link flex={2} to="/name"><ButtonOutline>Start Game</ButtonOutline></Link>
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
