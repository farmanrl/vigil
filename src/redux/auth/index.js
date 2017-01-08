import { auth } from '../firebase';
import * as authActions from './actions';

export { authActions };
export * from './types';
export { authReducer } from './reducer';
export { getAuth, isAuthenticated } from './selectors';

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsub = auth.onAuthStateChanged(
      (user) => {
        dispatch(authActions.initAuth(user));
        unsub();
        resolve();
      },
      error => reject(error)
    );
  });
}
