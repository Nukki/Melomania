import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class GuessResult extends Component {
  render() {
    return (
      <div className="big top-space">
           Leaderboard
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.song.song,
  loading: state.song.loading,
  error: state.song.error,
});

export default connect(mapStateToProps)(GuessResult);
