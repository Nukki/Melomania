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
    const { score, song } = this.props;
    this.props.getAnswer(score, answer, song.genreCode, song.playlistIndex);
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
          song && song.answerOptions.map(option => (
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
  score: state.user.score,
});

const mapDispatchToProps = { fetchSong, clearSong, getAnswer };

export default connect(mapStateToProps, mapDispatchToProps)(SongGuesser);
