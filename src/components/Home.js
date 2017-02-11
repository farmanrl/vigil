import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from '../redux/auth';
import { getUser } from '../redux/user';
import Information from './Information';
import Domain from './Domain';

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div style={{backgroundColor: '#333'}}>
        <Domain resources={this.props.user.resources} />
        <Information anon={this.props.auth.anon} />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getAuth,
  getUser,
  (auth, user) => ({ auth, user })
);

export default connect(
  mapStateToProps,
  authActions
)(Home);
