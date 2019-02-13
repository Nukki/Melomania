import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box, Text } from 'rebass';
import { fetchLeaderboard } from '../actions/Leaderboard';

class Leaderboard extends Component {
  componentDidMount() {
    this.props.fetchLeaderboard();
  }

  render() {
    const { leaders, loading, error } = this.props;
    return (
      <div>
        <div>
           Leaderboard
        </div>
        <ul>
          {
          leaders && !loading && leaders.map(user => (
            <li>{`name: ${user.name} score: ${user.score} `}</li>
          ))
          }
        </ul>
        <Link to="/name"><button>Play</button></Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leaders: state.leaders.list,
  loading: state.leaders.loading,
  error: state.leaders.error,
});

export default connect(mapStateToProps, { fetchLeaderboard })(Leaderboard);
