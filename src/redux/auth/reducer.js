import { Record } from 'immutable';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, HANDLE_RESOURCES, HANDLE_INFO } from './types';

export const AuthState = new Record({
  authenticated: false,
  uid: null,
  domain: null,
  resources: null,
  contacts: null,
  home: null,
  favorites: null,
  places: null,
  nodes: null,
  timestamp: null,
  style: null,
});

export function authReducer(state = new AuthState(), { payload, type }) {
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS:
      return state.merge({
        authenticated: !!payload,
        uid: payload ? payload.uid : null,
      });
    case HANDLE_RESOURCES:
      return state.merge({
        domain: payload.domain,
        resources: payload.resources,
      });
    case HANDLE_INFO:
      return state.merge({
        contacts: payload.contacts,
        home: payload.home,
        favorites: payload.favorites,
        places: payload.places,
        timestamp: payload.timestamp,
        style: payload.style,
        nodes: payload.nodes,
      });
    case SIGN_OUT_SUCCESS:
      return new AuthState();

    default:
      return state;
  }
}
