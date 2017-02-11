import { createSelector } from 'reselect';

export function getNodes(state) {
  return state.nodes;
}

export function getList(state) {
  return getNodes(state).nodeList;
}

export function getSafe(state) {
  return getNodes(state).safe;
}

export function getDanger(state) {
  return getNodes(state).danger;
}

export function getTimeFilter(state) {
  return getNodes(state).timeFilter;
}

export function getNodeFilter(state) {
  return getNodes(state).nodeFilter;
}

export function getDomainFilter(state) {
  return getNodes(state).domainFilter;
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

export const getNodesByDomain = createSelector(
  getList,
  getTimeFilter,
  (nodes, timeFilter) => {
    switch (timeFilter) {
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
