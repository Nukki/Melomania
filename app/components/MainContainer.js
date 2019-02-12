import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearSong } from '../actions/SongActions';
import { clearUser } from '../actions/UserActions';

class MainContainer extends Component {
  componentDidMount() {
    // clear state in case browser back button was pushed to get here
    if (this.props.user.name) {
      this.props.clearUser();
      this.props.clearSong();
    }
  }

  render() {
    return (
      <div>
        <div className="big top-space">
           Melomaniac
        </div>
        <Link className="btn btn-primary" to="/name"> Play </Link>
        <Link className="btn btn-primary" to="/leaderboard"> Leaderboard </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  clearSong,
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
