import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import ButtonOutline from './styled/ButtonOutline';
import JustText from './styled/JustText';
import AudioAnalyser from './audioViz/AudioAnalyser';
import { fetchSong, clearSong } from '../actions/SongActions';
import { getAnswer } from '../actions/AnswerActions';


class SongGuesser extends Component {
  constructor(props) {
    super(props);
    this.answerSelected = this.answerSelected.bind(this);
  }
  componentDidMount() {
    this.props.fetchSong();
  }

  answerSelected = (answer) => {
    const { user, song } = this.props;
    this.props.getAnswer(user.points, user.name, answer, song.genreCode, song.playlistIndex);
  }

  render() {
    const { song, loading, error, user } = this.props;
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

        <Flex flex={2} flexDirection="column" alignItems="start" px={2} >
          <JustText fontSize={[2, 3]} flex={1}>
             1. Press Play to listen to the song.
          </JustText>
          <JustText fontSize={[2, 3]} flex={1}>
             2. Guess who made it - click on an artist name.
          </JustText>
        </Flex>

        <Flex
          flex={[8, 6]}
          width="80vw"
          flexDirection={['column', 'row', 'row']}
          justifyContent="space-evenly"
        >
          <Box flex={[2, 3]}>
            {
              song && <AudioAnalyser flex={3} music={song.songUrl} />
            }
          </Box>
          <Flex
            flex={[4, 2]}
            flexDirection="column"
            alignItems={['center', 'start']}
            justifyContent={['space-around', 'space-evenly']}
            py={[2, 3, 4]}
          >
            {
              song && !loading && song.answerOptions.map(option => (
                <Link
                  to="/result"
                  key={option}
                  answer={option}
                  onClick={() => this.answerSelected(option)}
                >
                  <ButtonOutline>
                    {option}
                  </ButtonOutline>
                </Link>
              ))
            }
          </Flex>
        </Flex>

      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  song: state.song.song,
  loading: state.song.loading,
  error: state.song.error,
  user: state.user,
});

const mapDispatchToProps = { fetchSong, clearSong, getAnswer };

export default connect(mapStateToProps, mapDispatchToProps)(SongGuesser);
