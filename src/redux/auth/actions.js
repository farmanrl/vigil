import firebase from 'firebase';
import { auth } from '../firebase';
import { unloadUser } from '../user/actions';

export function initAuth(user) {
  return {
    type: 'INIT_AUTH',
    payload: user
  };
}

export function signInError(error) {
  return {
    type: 'SIGN_IN_ERROR',
    payload: error
  };
}

export function signInSuccess(result) {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: result,
  };
}

export function signOutSuccess() {
  return {
    type: 'SIGN_OUT_SUCCESS'
  };
}

export function signInWithGoogle() {
  return (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    auth.signInWithRedirect(provider)
        .then((result) => {
          dispatch(signInSuccess(result));
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
  const uid = auth.currentUser.uid;
  return (dispatch) => {
    auth.signOut()
        .then(() => {
          dispatch(signOutSuccess());
          dispatch(unloadUser(uid));
        });
  };
}
