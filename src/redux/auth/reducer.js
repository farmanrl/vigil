import { Record } from 'immutable';

export const AuthState = new Record({
  authenticated: false,
  uid: null,
  anon: null,
});

export function authReducer(state = new AuthState(), { payload, type }) {
  switch (type) {
    case 'INIT_AUTH':
    case 'SIGN_IN_SUCCESS':
      return state.merge({
        authenticated: !!payload,
        uid: payload ? payload.uid : null,
        anon: payload ? payload.isAnonymous : null,
      });
    case 'SIGN_OUT_SUCCESS':
      return new AuthState();
    default:
      return state;
  }
}
