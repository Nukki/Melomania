import React from 'react';
import { connect } from 'react-redux';

const MainContainer = ({ name }) => (
  <div>
    <div className="big top-space">
      {name} Starter
    </div>
    <div>
      <img className="rotating center" src="/public/images/ball.png" alt="ball" />
    </div>
  </div>
);

function mapStateToProps({ name }) {
  return { name };
}

export default connect(mapStateToProps)(MainContainer);
