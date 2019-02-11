import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NameForm from './form/NameForm';

class EnterName extends Component {
  render() {
    return (
      <div>
        <div className="big top-space">
           Enter Name
        </div>
        <NameForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.song.song,
  loading: state.song.loading,
  error: state.song.error,
});

export default connect(mapStateToProps)(EnterName);
