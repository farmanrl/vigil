import { List, Record } from 'immutable';

export const NodesState = new Record({
  nodeList: new List(),
  nodeFilter: 'All',
  timeFilter: 0,
  valid: null,
  timelimit: null,
  timestamp: null,
  position: null,
  placeId: null,
  address: null,
  showModal: null,
  reports: null,
  rating: null,
  style: null,
  safe: null,
  danger: null,
});

export function nodesReducer(state = new NodesState(), { payload, type }) {
  switch (type) {
    case 'UPDATE_POSITION':
      return state.merge({
        position: payload.position,
        placeId: payload.placeId,
        address: payload.address,
      });
    case 'UPDATE_TIMESTAMP':
      return state.merge({
        timestamp: payload
      });
    case 'SUBMIT_NODE_FAILURE':
      return state.merge({
        valid: false,
        timelimit: payload,
      });
    case 'LOAD_NODE_SUCCESS':
      return state.merge({
        showModal: null,
        nodeList: state.nodeList
                       .filter(n => n.key !== payload.key)
                       .push(payload)
      });
    case 'ADD_NODE_FAILURE':
      return state.merge({
        valid: false,
        timelimit: payload,
      });
    case 'SHOW_MODAL':
      return state.merge({
        showModal: payload
      });
    case 'CLOSE_MODAL':
      return state.merge({
        showModal: null
      });

    case 'CHANGE_NODE_FILTER':
      return state.merge({
        nodeFilter: payload.nodeFilter,
        timeFilter: payload.time,
      });

    case 'GET_RATING_SUCCESS':
      return state.merge({
        safe: payload.safe,
        danger: payload.danger,
        reports: payload.reports,
        rating: payload.rating,
      });
    case 'GET_STYLE_SUCCESS':
    case 'SET_STYLE_SUCCESS':
      return state.merge({
        style: payload
      });
    case 'HANDLE_ERROR':
      console.log('error', payload);
      break;

    case 'SET_ROUTE':
      return state.merge({
        showModal: null,
      });

    case 'SIGN_OUT_SUCCESS':
      return new NodesState();

    default:
      return state;
  }
  return null;
}
