import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideModal, showModal } from '../actions/ModalActions';

class MainContainer extends Component {
  openNameModal() {
    this.props.showModal({
      open: true,
      title: 'Alert Modal',
      closeModal: this.closeModal,
    }, 'alert');
  }

  render() {
    return (
      <div>
        <div className="big top-space">
           Melomaniac
        </div>
        <Link href="#" className="btn btn-primary" to="/name"> Play </Link>
        <Link href="#" className="btn btn-primary" to="/leaderboard"> Leaderboard </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ name }) => ({ name });


const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
