import React, { PropTypes } from 'react';
import { Button, Label } from 'react-bootstrap';
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
      <h1>VIGIL <h4><Label>1.0</Label></h4></h1>
      <h5>By using this app, you agree to our <a href="https://media.termsfeed.com/pdf/eula-template.pdf">EULA</a></h5>
      <br />
      <Button bsSize="lg" onClick={signInWithGoogle}>
        Sign In
      </Button>
      <br />
      <h4>Sign in for more features.</h4>
      <h4>All user data is anonymous.</h4>
      <br />
      <Button bsSize="lg" onClick={signInAnon}>
        Continue
      </Button>
      <br />
      <h4>Continue without authorization.</h4>
      <br />
      <h5>Add this page to your home screen for a mobile app</h5>
      <h5>VIGIL is under ongoing development.</h5>
      <h5>Created by Richard Farman</h5>
    </div>
  );
}

SignIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInAnon: PropTypes.func.isRequired,
};

export default connect(null, authActions)(SignIn);
