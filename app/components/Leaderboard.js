import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLeaderboard } from '../actions/Leaderboard';

class Leaderboard extends Component {
  componentDidMount() {
    this.props.fetchLeaderboard();
  }

  render() {
    const { leaders, loading, error } = this.props;
    return (
      <div>
        <div className="big top-space">
           Leaderboard
        </div>
        <ul>
          {
          leaders && !loading && leaders.map(user => (
            <li>{`name: ${user.name} score: ${user.score} `}</li>
          ))
          }
        </ul>
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
