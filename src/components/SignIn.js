import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authActions } from '../redux/auth';

export function SignIn({ signInWithGoogle, signInAnon }) {
  return (
    <div style={{ height: 'auto', minHeight: '100%', backgroundColor: '#333', color: 'white'}}>
      <img
          src={require("./vigil.png")}
          className="App-logo"
          alt="logo"
          style={{ height: 200, paddingTop: 12 }}
      />
      <h1>VIGIL</h1>
      <br />
      <Button bsSize="lg" onClick={signInWithGoogle}>
        Sign In
      </Button>
      <h4>Signing in will allow you to report your location,</h4>
      <h4>resources provided based on domain.</h4>
      <h4>All user data is anonymous.</h4>
      <br />
      <Button bsSize="lg" onClick={signInAnon}>
        Continue
      </Button>
      <h4>You will not be able to report your location,</h4>
      <h4>or access additional resources for domains.</h4>
      <br />
      <h5>Add page to home screen to use as an app!</h5>
    </div>
  );
}

SignIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInAnon: PropTypes.func.isRequired,
};

export default connect(null, authActions)(SignIn);
