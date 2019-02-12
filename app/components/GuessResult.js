import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class GuessResult extends Component {
  render() {
    return (
      <div className="big top-space">
        <div>
           GuessResult
        </div>
        {
          this.props.answer && (
            <div>
              <div>{this.props.answer.right ? 'Thats right' : 'NOPE'}</div>
              <div>{`${this.props.answer.artist} ${this.props.answer.songName}`}</div>
            </div>
          )
        }
        <Link to="/"> Im done </Link>
        <Link to="/guess"> Next song </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  song: state.song.song,
  loading: state.song.loading,
  error: state.song.error,
  answer: state.answer,
});

export default connect(mapStateToProps)(GuessResult);
