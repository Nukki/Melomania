import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    this.props.getAnswer(user.points, answer, song.genreCode, song.playlistIndex);
    // this.props.clearSong();
  }

  render() {
    const { song, loading, error } = this.props;
    return (
      <div className="big top-space">
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
