import { Record } from 'immutable';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, HANDLE_RESOURCES } from './types';

export const AuthState = new Record({
  authenticated: false,
  id: null,
  isAnon: null,
  resources: null,
});

export function authReducer(state = new AuthState(), { payload, type }) {
  console.log(payload, type);
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS:
      return state.merge({
        authenticated: !!payload,
        id: payload ? payload.uid : null,
        isAnon: payload ? payload.isAnonymous : null,
      });

    case HANDLE_RESOURCES:
      console.log('handle_resources', payload);
      return state.merge({
        resources: payload
      });
    case SIGN_OUT_SUCCESS:
      return new AuthState();

    default:
      return state;
  }
}
