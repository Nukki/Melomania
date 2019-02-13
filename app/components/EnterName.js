import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Flex, Box, Text } from 'rebass';
import NameForm from './form/NameForm';

class EnterName extends Component {
  render() {
    const { user } = this.props;
    if (user.name) {
      return <Redirect to="/guess" />;
    }
    return (
      <div>
        <div>
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
