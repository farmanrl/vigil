import * as userActions from './actions';

export { userActions };
export { getUser } from './selectors';
export { userReducer } from './reducer';

export function initUser(dispatch, user) {
  return new Promise((resolve, reject) => {
    dispatch(userActions.loadUser(user));
    resolve();
  });
}
