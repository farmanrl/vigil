import React, { PropTypes } from 'react';
import { Button, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authActions } from '../redux/auth';
import logo from './vigil.png';
import { version } from '../../package.json';

const background = {
  height: 'auto',
  minHeight: '100%',
  backgroundColor: '#333',
  color: 'white'
};

export function SignIn({ signInWithGoogle, signInAnon }) {
  return (
    <div style={background}>
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        style={{ height: 200, paddingTop: 12 }}
      />
      <h1>VIGIL</h1><h4><Label>{version}</Label></h4>
      <br />
      <Button bsSize="lg" onClick={signInWithGoogle}>
        Sign In
      </Button>
      <br />
      <h4>Sign in for more features</h4>
      <h4><i>All user data is anonymous</i></h4>
      <br />
      <Button bsSize="lg" onClick={signInAnon}>
        Continue
      </Button>
      <br />
      <h4>Continue without authentication</h4>
      <br />
      <h5>Add this page to your home screen for mobile.</h5>
      <h5>VIGIL is under ongoing development.</h5>
      <h5>Created by Richard Farman.</h5>
    </div>
  );
}

SignIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInAnon: PropTypes.func.isRequired,
};

export default connect(null, authActions)(SignIn);
