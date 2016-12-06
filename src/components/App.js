import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from '../redux/auth';
import { paths } from './Routes';
import './App.css';
import Header from './Header';

class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    } else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.MAP);
    }
  }

  render() {
    return (
      <div className="App">
        <Header
            signOut={this.props.signOut}
            authenticated={this.props.auth.authenticated}
            route={location.pathname}
        />
        <main className="main">{this.props.children}</main>
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
)(App);
