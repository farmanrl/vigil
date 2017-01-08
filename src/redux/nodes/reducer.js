import { Record } from 'immutable';

import {
  UPDATE_LOCATION,
  UPDATE_TIME,
  SUBMIT_NODE_SUCCESS,
  SUBMIT_NODE_FAILURE,
  ADD_NODE_SUCCESS,
  ADD_NODE_FAILURE,
  LOAD_NODES_SUCCESS,
  LOAD_NODES_FAILURE,
  SHOW_MODAL,
  CLOSE_MODAL,
  GET_RATING_SUCCESS,
  GET_STYLE_SUCCESS,
  SET_STYLE_SUCCESS,
  CHANGE_FILTER,
  HANDLE_ERROR,
} from './types';

export const NodesState = new Record({
  totalSafe: null,
  totalDanger: null,
  totalNodes: null,
  list: null,
  safe: null,
  danger: null,
  filter: 'All',
  valid: null,
  limit: null,
  timestamp: null,
  location: null,
  placeId: null,
  address: null,
  showModal: null,
  reports: null,
  rating: null,
  style: null,
});

export function nodesReducer(state = new NodesState(), { payload, type }) {
  console.log(payload, type);
  switch (type) {
    case UPDATE_LOCATION:
      return state.merge({
        location: payload.position,
        placeId: payload.placeId,
        address: payload.address,
      });
    case UPDATE_TIME:
      return state.merge({
        timestamp: payload
      });
    case SUBMIT_NODE_SUCCESS:
      return state.merge({
        valid: true,
        limit: null,
      });
    case SUBMIT_NODE_FAILURE:
      return state.merge({
        valid: false,
        limit: payload,
      });
    case ADD_NODE_SUCCESS:
    case ADD_NODE_FAILURE:
    case LOAD_NODES_SUCCESS:
      return state.merge({
        list: payload.list,
        totalSafe: payload.safe,
        totalDanger: payload.danger,
      });
    case LOAD_NODES_FAILURE:
    case SHOW_MODAL:
      return state.merge({
        showModal: payload
      });
    case CLOSE_MODAL:
      return state.merge({
        showModal: null
      });
    case CHANGE_FILTER:
      return state.merge({
        filter: payload
      });
    case GET_RATING_SUCCESS:
      return state.merge({
        safe: payload.safe,
        danger: payload.danger,
        reports: payload.reports,
        rating: payload.rating,
      });
    case GET_STYLE_SUCCESS:
    case SET_STYLE_SUCCESS:
      return state.merge({
        style: payload
      });
    case HANDLE_ERROR:
      console.log('error', payload);
      break;
    default:
      return state;
  }
}
