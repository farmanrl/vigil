import { List, Record } from 'immutable';

export const UserState = new Record({
  userNodeList: new List(),
  contactList: new List(),
  directionList: new List(),
  style: null,
  timestamp: null,
  domain: null,
  resources: null,
  route: null,
});

export function userReducer(state = new UserState(), { payload, type }) {
  switch (type) {
    case 'LOAD_USER_NODE':
      return state.merge({
        userNodeList: state.userNodeList.unshift(payload)
      });
    case 'LOAD_USER_HOME':
      return state.merge({
        directionList: state.directionList.filter(direction => direction.key !== payload.key).unshift(payload)
      });
    case 'LOAD_USER_DIRECTION':
      return state.merge({
        directionList: state.directionList.unshift(payload)
      });
    case 'LOAD_USER_CONTACT':
      return state.merge({
        contactList: state.contactList.unshift(payload)
      });

    case 'DELETE_USER_DIRECTION':
      return state.merge({
        directionList: state.directionList.filter(direction => direction.key !== payload.key)
      });
    case 'DELETE_USER_CONTACT':
      return state.merge({
        contactList: state.contactList.filter(contact => contact.key !== payload.key)
      });

    case 'LOAD_USER_STYLE':
      return state.merge({
        style: payload
      });

    case 'LOAD_USER_TIMESTAMP':
      return state.merge({
        timestamp: payload
      });

    case 'LOAD_USER_RESOURCES':
      return state.merge({
        domain: payload.domain,
        resources: payload.resources
      });

    case 'SET_ROUTE':
      return state.merge({
        route: payload
      });

    case 'SIGN_OUT_SUCCESS':
      return new UserState();

    default:
      return state;
  }
}
