import { initAuth } from './auth';
import { initUser } from './user';
import { initNodes } from './nodes';
import { auth } from './firebase';

export function initApp(dispatch) {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(
      (user) => {
        initAuth(dispatch, user)
          .then(() => initUser(dispatch, user))
          .then(() => initNodes(dispatch));
        resolve();
      },
      error => reject(error)
    );
  });
}
