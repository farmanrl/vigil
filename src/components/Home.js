import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from '../redux/auth';
import Information from './Information';
import Resources from './Resources';

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <Resources resources={this.props.auth.resources} />
        <Information />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getAuth,
  auth => ({ auth })
);

export default connect(
  mapStateToProps,
  authActions
)(Home);
