import firebase from 'firebase';
import { firebaseAuth } from '../firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  HANDLE_RESOURCES
} from './types';

export function initAuth(user) {
  return (dispatch) => {
    dispatch({ type: INIT_AUTH, payload: user });
    if (user.email != null) {
      dispatch(handleDomain(user.email));
    }
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}

export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result,
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}

export function handleResources(domain) {
  return {
    type: HANDLE_RESOURCES,
    payload: domain
  };
}

export function handleDomain(email) {
  let domain = email.replace(/.*@/, '');
  const index = domain.indexOf('.');
  domain = domain.substring(0, index);
  return (dispatch) => {
    const ref = firebase.database().ref('domains/');
    ref.once('value', ((snapshot) => {
      const child = snapshot.child(domain);
      console.log('fdas');
      if (child.exists()) {
        console.log('vasd');
        const resources = child.val();
        console.log(resources);
        dispatch(handleResources(resources));
      } else {
        const entry = {};
        entry[domain] = { users: 1 };
        console.log(entry);
        ref.set(entry);
      }
    }));
  };
}

export function signInWithGoogle() {
  return (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    firebaseAuth.signInWithPopup(provider)
                .then((result) => {
                  dispatch(signInSuccess(result));
                  dispatch(handleDomain(result.user.email));
                })
                .catch(error => dispatch(signInError(error)));
  };
}

export function signInAnon() {
  return (dispatch) => {
    firebase.auth().signInAnonymously()
            .then(result => dispatch(signInSuccess(result)))
            .catch(error => dispatch(signInError(error)));
  };
}


export function signOut() {
  return (dispatch) => {
    firebaseAuth.signOut()
                .then(() => dispatch(signOutSuccess()));
  };
}
