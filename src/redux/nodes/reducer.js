import * as types from './types';

const initalState = {
  MapContainer: {
    nodes: null,
    filter: 'all',
    start: 0,
  },
  Map: {
    center: null,
    location: null,
    zoom: null,
  },
}

export function mapReducer(state = initialState.MapContainer, action) {
  switch(action.type) {
    case type.ADD_NODE_SUCCESS:
      return Object.assign({}, state.nodes, { nodes: [...state.nodes, node] })
    case type.GET_NODES_SUCCESS:
      return Object.assign({}, state.nodes, nodes);
  }
}
