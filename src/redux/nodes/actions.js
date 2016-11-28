import firebase from 'firebase';
import * as type from './types';

export function addNode() {
  return (dispatch) => {
    dispatch({ type: type.ADD_NODE });
    navigator.geolocation.getCurrentPosition((position) => {
      const id = firebase.database().ref().child('/nodes').push().key;
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const timestamp = firebase.database.ServerValue.TIMESTAMP;
      const node = { lat, lng, timestamp };
      const updates = {};
      updates[`/nodes/${id}`] = node;
      firebase.database().ref().update(updates)
              .then(() => dispatch({ type: type.ADD_NODE_SUCCESS, node }))
              .catch(error => dispatch({ type: type.ADD_NODE_ERROR, error }));
    });
  };
}

export function getNodes() {
  return (dispatch, getState) => {
    const state = getState();
    firebase.database().ref('nodes/')
            .on('value', (snapshot) => {
              const nodes = [];
              snapshot.forEach((data) => {
                if (data.val().timestamp > state.start) {
                  nodes.push(data.val());
                }
              });
              dispatch({ type: type.GET_NODES, nodes });
            })
            .then(() => dispatch({ type: type.GET_NODES_SUCCESS }))
            .catch(error => dispatch({ type: type.GET_NODES_ERROR, error }));
  };
}

export function filterNodes(filter) {
  return dispatch => dispatch({ type: type.FILTER_NODES, filter });
}
