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
      <Flex flexDirection="column">
        <JustText fontSize={[1, 3, 4]} flex={1}>
           Who made this song?
           instructions blabla
        </JustText>

        <Flex flex={[8, 5, 5]} flexDirection={['column', 'row', 'row']}>
          <Box flex={2}>
            {
              song && <AudioAnalyser flex={3} music={song.songUrl} />
            }
          </Box>
          <Flex flex={[4, 3, 3]} flexDirection="column" justifyContent="space-around" py={[0, 0, 3]}>
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
