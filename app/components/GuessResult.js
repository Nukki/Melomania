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
        <Flex flex={1} alignItems="center" >
          <JustText>
            {`Player: ${user.name}`}
          </JustText>
          <JustText ml={3}>
            {`Score: ${user.points}`}
          </JustText>
        </Flex>

        <Box flex={7}>
          {
            answer && !loading && (
              <Flex flexDirection="column" alignItems="center" justifyContent="center">
                <Flex flex={1} width={['80vw', '50vw']} py={[3, 4]} bg="mediumpurple" flexDirection="column" alignItems="center">
                  <JustText fontSize={5}>{ answer.right ? 'That\'s right!' : 'Wrong!'}</JustText>
                  <JustText fontSize={4}>{ answer.right ? `You earned ${answer.plusScore} point(s)` : 'GAME OVER'}</JustText>
                </Flex>
                <Flex flex={1} py={[5, 5]} flexDirection="column" alignItems="center" justifyContent="center">
                  <JustText>The song was</JustText>
                  <JustText fontSize={[2, 3]}>{`${answer.songName}`}</JustText>
                  <JustText fontSize={[2, 3]}>{`by ${answer.artist}`}</JustText>
                </Flex>
              </Flex>
            )
          }
        </Box>

        <Flex flexDirection="row" flex={2}>
          {
            answer && answer.right && (
              <Flex>
                <Box>
                  <Link to="/"><ButtonOutline> Im done </ButtonOutline></Link>
                </Box>
                <Box ml={3}>
                  <Link to="/guess"><ButtonOutline> Next song </ButtonOutline></Link>
                </Box>
              </Flex>
            )
          }
          {
            answer && !answer.right && (
              <Link to="/"><ButtonOutline> OK </ButtonOutline></Link>
            )
          }
        </Flex>

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
