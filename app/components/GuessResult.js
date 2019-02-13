import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box, Text } from 'rebass';

class GuessResult extends Component {
  render() {
    const { answer, loading, error } = this.props;
    return (
      <div>
        <div>
           GuessResult
        </div>
        {
          answer && !loading && (
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
  answer: state.answer,
  loading: state.answer.loading,
  error: state.answer.error,
});

export default connect(mapStateToProps)(GuessResult);
