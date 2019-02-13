import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Flex, Box, Text } from 'rebass';
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
      <div>
        <div>
           SongGuesser
        </div>
        {
          song && <audio controls src={song.songUrl} />
        }
        {
          song && !loading && song.answerOptions.map(option => (
            <Link
              to="/result"
              key={option}
              answer={option}
              onClick={() => this.answerSelected(option)}
            >
              {option}
            </Link>
          ))
        }
      </div>
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
