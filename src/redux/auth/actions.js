import firebase from 'firebase';
import { auth } from '../firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  HANDLE_RESOURCES,
  HANDLE_INFO,
} from './types';

export function initAuth(user) {
  return (dispatch) => {
    dispatch({ type: INIT_AUTH, payload: user });
    if (user != null) {
      dispatch(handleUser(user));
      if (user.email != null) {
        dispatch(handleDomain(user.email));
      }
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

export function handleResources(resources, domain) {
  return {
    type: HANDLE_RESOURCES,
    payload: { resources, domain }
  };
}

export function handleUserInfo(info) {
  return {
    type: HANDLE_INFO,
    payload: info,
  };
}

export function handleUser(user) {
  return (dispatch) => {
    firebase.database().ref(`users/${user.uid}`)
            .once('value', ((snapshot) => {
              dispatch(handleUserInfo(snapshot.val()));
            }));
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
      if (child.exists()) {
        const resources = child.val();
        dispatch(handleResources(resources, domain));
      } else {
        const entry = {};
        entry[domain] = { valid: false };
        ref.update(entry);
      }
    }));
  };
}

export function signInWithGoogle() {
  return (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    auth.signInWithPopup(provider)
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
    auth.signOut()
        .then(() => dispatch(signOutSuccess()));
  };
}
