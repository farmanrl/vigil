import { database } from '../firebase';
import {
  getUserTimestamp,
  getUserNodeList,
  getUserDomain,
} from '../user/selectors';
import {
  getUid,
  isAnon,
} from '../auth/selectors';
import { GoogleMapsLoader } from '../googlemaps';

export function showModal(modal) {
  return {
    type: 'SHOW_MODAL',
    payload: modal
  };
}

export function closeModal() {
  return {
    type: 'CLOSE_MODAL'
  };
}

export function updatePosition(position, placeId, address) {
  return {
    type: 'UPDATE_POSITION',
    payload: { position, placeId, address }
  };
}

export function updateTimestamp(timestamp) {
  return {
    type: 'UPDATE_TIMESTAMP',
    payload: timestamp
  };
}

export function addNodeFailure(timeLimit) {
  return {
    type: 'ADD_NODE_FAILURE',
    payload: timeLimit
  };
}

export function loadNodeSuccess(node) {
  return {
    type: 'LOAD_NODE_SUCCESS',
    payload: node
  };
}

export function getRatingSuccess(safe, danger, reports, rating) {
  return {
    type: 'GET_RATING_SUCCESS',
    payload: { safe, danger, reports, rating }
  };
}

export function handleError(error) {
  return {
    type: 'HANDLE_ERROR',
    payload: error
  };
}

export function timeFilter(timestamp, filter) {
  switch (filter) {
    case 'Day':
      return timestamp - 86400000;
    case 'Week':
      return timestamp - 604800000;
    case 'Month':
      return timestamp - 2629746000;
    case 'Year':
      return timestamp - 31536000000;
    case 'All':
      return 0;
    default:
      return 0;
  }
}

export function update() {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition((position) => {
      GoogleMapsLoader.load((google) => {
        const geocoder = new google.maps.Geocoder();
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK') {
            const placeId = results[0].place_id;
            const address = results[0].formatted_address;
            dispatch(updatePosition(location, placeId, address));
          }
        });
      });
    });
    const time = Date.now();
    dispatch(updateTimestamp(time));
  };
}

export function loadNodes() {
  return (dispatch) => {
    const nodes = database.ref('nodes/');
    nodes.on('child_added', (data) => {
      const domain = data.key;
      const val = data.val();
      Object.keys(val).forEach((key) => {
        const node = val[key];
        dispatch(loadNodeSuccess({ domain, key, node }));
      });
    });
    nodes.on('child_changed', (data) => {
      const domain = data.key;
      const val = data.val();
      Object.keys(val).forEach((key) => {
        const node = val[key];
        dispatch(loadNodeSuccess({ domain, key, node }));
      });
    });
    nodes.on('child_removed', (data) => {
      const key = data.key;
      const node = {};
      node[key] = null;
      dispatch(loadNodeSuccess(node));
    });
  };
}

export function addNode(report) {
  return (dispatch, getState) => {
    const timestamp = Date.now();
    const state = getState();
    if (report && !isAnon(state)) {
      const timeLimit = timestamp - getUserTimestamp(state);
      if (timeLimit > 600000) {
        navigator.geolocation.getCurrentPosition((position) => {
          GoogleMapsLoader.load((google) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            const domain = getUserDomain(state);
            const userNodes = getUserNodeList(state);
            const uid = getUid(state);
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location }, (results, status) => {
              if (status === 'OK') {
                const placeId = results[0].place_id;
                const address = results[0].formatted_address;
                const node = { report, location, timestamp, placeId, address };
                const updates = {};
                let hasNode = false;
                if (userNodes) {
                  userNodes.map((entry) => {
                    if (entry.key === placeId) {
                      const id = entry.node;
                      updates[`/nodes/${domain}/${id}`] = node;
                      updates[`/users/${uid}/timestamp`] = timestamp;
                      hasNode = true;
                    }
                    return null;
                  });
                }
                if (!hasNode) {
                  const id = database.ref().child(`/nodes/${domain}`)
                                     .push().key;
                  updates[`/nodes/${domain}/${id}`] = node;
                  updates[`/users/${uid}/nodes/${placeId}`] = id;
                  updates[`/users/${uid}/timestamp`] = timestamp;
                }
                database.ref().update(updates);
              } else {
                dispatch(addNodeFailure(status));
              }
            });
          });
        });
      } else {
        const minutes = Math.floor((600000 - timeLimit) / 60000);
        dispatch(addNodeFailure(minutes));
      }
    }
  };
}

export function changeNodeFilter(nodeFilter) {
  return (dispatch) => {
    const time = timeFilter(Date.now(), nodeFilter);
    dispatch({
      type: 'CHANGE_NODE_FILTER',
      payload: { nodeFilter, time }
    });
  };
}
