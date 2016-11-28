import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authActions } from '../redux/auth';

export function SignIn({ signInWithGoogle, signInAnon }) {
  return (
    <div>
      <img
          src={require("./vigil.png")}
          className="App-logo"
          alt="logo"
          style={{ height: 250, paddingTop: 25 }}
      />
      <h1>Sign in with your account</h1>
      <Button bsSize="lg" onClick={signInWithGoogle}>
        Sign In
      </Button>
      <h4>Signing in will allow you to report your location,</h4>
      <h4>and allow us to provide further resources for your safety.</h4>
      <h1>Or continue without authorization</h1>
      <Button bsSize="lg" onClick={signInAnon}>
        Continue
      </Button>
    </div>
  );
}

SignIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInAnon: PropTypes.func.isRequired,
};

export default connect(null, authActions)(SignIn);
