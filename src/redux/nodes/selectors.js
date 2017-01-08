import { createSelector } from 'reselect';

export function getAuthUid(state) {
  return state.auth.uid;
}

export function getAuthTimestamp(state) {
  return state.auth.timestamp;
}

export function isAuthAnon(state) {
  return state.auth.isAnon;
}

export function getNodes(state) {
  return state.nodes;
}

export function getList(state) {
  return getNodes(state).list;
}

export function getSafe(state) {
  return getNodes(state).safe;
}

export function getDanger(state) {
  return getNodes(state).danger;
}

export function getFilter(state) {
  return getNodes(state).filter;
}

export function getCurrentLocation(state) {
  return getNodes(state).location;
}

export function getCurrentTimestamp(state) {
  return getNodes(state).timestamp;
}

export function getValid(state) {
  return getNodes(state).valid;
}

export const getActiveNodes = createSelector(
  getList,
  getFilter,
  (nodes, filter) => {
    switch (filter) {
      case 'safe':
        return nodes.filter(node => node.report === 'safe');

      case 'danger':
        return nodes.filter(node => node.report === 'danger');

      case 'all':
        return nodes;

      default:
        return nodes;
    }
  }
);
