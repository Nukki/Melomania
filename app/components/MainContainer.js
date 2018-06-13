import React, { Component } from 'react';
import { connect } from 'react-redux';
// import pok from '../../public/images/ball.png';

class MainContainer extends Component {
  render() {
    return (
      <div>
        <div className="big top-space">
          {this.props.name} Starter
        </div>
        <div>
          <img className="rotating center" src="/public/images/ball.png" alt="ball" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ name }) {
  return { name };
}

export default connect(mapStateToProps)(MainContainer);
