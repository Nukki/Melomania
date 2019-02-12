import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NameForm from './form/NameForm';

class EnterName extends Component {
  render() {
    const { user } = this.props;
    if (user.name) {
      return <Redirect to="/guess" />;
    }
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
  user: state.user,
});

export default connect(mapStateToProps)(EnterName);
