import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import ButtonOutline from './styled/ButtonOutline';
import JustText from './styled/JustText';

class GuessResult extends Component {
  render() {
    const { answer, loading, error, user } = this.props;
    if (!user.name) {
      // in case of refresh go home
      return <Redirect to="/" />;
    }
    return (
      <Flex flexDirection="column" alignItems="center">
        {
          answer && !loading && (
            <Flex flexDirection="column">
              <JustText>{ answer.right ? 'Well done!' : 'GAME OVER'}</JustText>
              <JustText>{`${answer.songName} by ${answer.artist}`}</JustText>
            </Flex>
          )
        }
        {
          answer && answer.right && (
            <Flex flexDirection="row">
              <Link to="/"><ButtonOutline> Im done </ButtonOutline></Link>
              <Link to="/guess"><ButtonOutline> Next song </ButtonOutline></Link>
            </Flex>
          )
        }
        {
          answer && !answer.right && (
            <Flex flexDirection="row">
              <Link to="/"><ButtonOutline> OK </ButtonOutline></Link>
            </Flex>
          )
        }
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  answer: state.answer,
  loading: state.answer.loading,
  error: state.answer.error,
  user: state.user,
});

export default connect(mapStateToProps)(GuessResult);
