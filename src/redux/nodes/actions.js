import { database } from '../firebase';
import {
  getCurrentLocation,
  getList,
  getFilter,
  getCurrentTimestamp
} from './selectors';
import {
  getUserTimestamp,
  getUserNodes,
  getDomain,
  getUid,
  isAnon,
} from '../auth/selectors';
import { GoogleMapsLoader } from '../googlemaps';
import {
  UPDATE_LOCATION,
  UPDATE_TIME,
  SUBMIT_NODE_SUCCESS,
  SUBMIT_NODE_FAILURE,
  ADD_NODE_SUCCESS,
  ADD_NODE_FAILURE,
  LOAD_NODES_SUCCESS,
  LOAD_NODES_FAILURE,
  GET_RATING_SUCCESS,
  GET_STYLE_SUCCESS,
  SET_STYLE_SUCCESS,
  SHOW_MODAL,
  CLOSE_MODAL,
  CHANGE_FILTER,
  HANDLE_ERROR,
} from './types';
import { dark, light, retro, night, silver, aubergine } from '../../components/MapStyles';


export function showModal(modal) {
  return {
    type: SHOW_MODAL,
    payload: modal
  };
}

export function closeModal() {
  return {
    type: SHOW_MODAL
  };
}

export function updateLocation(position, placeId, address) {
  return {
    type: UPDATE_LOCATION,
    payload: { position, placeId, address }
  };
}

export function updateTime(timestamp) {
  return {
    type: UPDATE_TIME,
    payload: timestamp
  };
}

export function submitNodeSuccess() {
  return {
    type: SUBMIT_NODE_SUCCESS,
  };
}

export function submitNodeFailure(timeLimit) {
  return {
    type: SUBMIT_NODE_FAILURE,
    payload: timeLimit
  };
}

export function addNodeSuccess() {
  return {
    type: ADD_NODE_SUCCESS,
  };
}

export function loadNodesSuccess(list, safe, danger) {
  return {
    type: LOAD_NODES_SUCCESS,
    payload: { list, safe, danger }
  };
}

export function getRatingSuccess(safe, danger, reports, rating) {
  return {
    type: GET_RATING_SUCCESS,
    payload: { safe, danger, reports, rating }
  };
}

export function setStyleSuccess(style) {
  return {
    type: SET_STYLE_SUCCESS,
    payload: style,
  };
}

export function handleError(error) {
  return {
    type: HANDLE_ERROR,
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
        const geocoder = new google.maps.Geocoder;
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK') {
            const placeId = results[0].place_id;
            const address = results[0].formatted_address;
            dispatch(updateLocation(location, placeId, address));
          }
        });
      });
    });
    const time = Date.now();
    dispatch(updateTime(time));
  };
}

export function loadNodes() {
  return (dispatch, getState) => {
    const state = getState();
    const timestamp = getCurrentTimestamp(state);
    const filter = getFilter(state);
    const time = timeFilter(timestamp, filter);
    const list = [];
    let safe = 0;
    let danger = 0;
    database.ref('nodes/')
            .on('value', (snapshot) => {
              snapshot.forEach((domain) => {
                domain.forEach((node) => {
                  const data = node.val();
                  if (data.timestamp > time) {
                    list.push(data);
                    if (data.report === 'safe') {
                      safe += 1;
                    } else {
                      danger += 1;
                    }
                  }
                });
              });
              dispatch(loadNodesSuccess(list, safe, danger));
            });
  };
}

export function addNode(report) {
  return (dispatch, getState) => {
    const state = getState();
    if (report && !isAnon(state)) {
      const timeLimit = getCurrentTimestamp(state) - getUserTimestamp(state);
      if (timeLimit > 600000) {
        GoogleMapsLoader.load((google) => {
          const location = getCurrentLocation(state).toJS();
          const timestamp = getCurrentTimestamp(state);
          const domain = getDomain(state);
          const userNodes = getUserNodes(state);
          const uid = getUid(state);
          const geocoder = new google.maps.Geocoder;
          geocoder.geocode({ location }, (results, status) => {
            if (status === 'OK') {
              const placeId = results[0].place_id;
              const address = results[0].formatted_address;
              const node = { report, location, timestamp, placeId, address };
              const updates = {};
              if (userNodes) {
                if (placeId in userNodes) {
                  const id = userNodes[placeId];
                  updates[`/nodes/${domain}/${id}`] = node;
                  updates[`/users/${uid}/timestamp`] = timestamp;
                } else {
                  const id = database.ref().child(`/nodes/${domain}`)
                                     .push().key;
                  updates[`/nodes/${domain}/${id}`] = node;
                  updates[`/users/${uid}/nodes/${placeId}`] = id;
                  updates[`/users/${uid}/timestamp`] = timestamp;
                }
              } else {
                const id = database.ref().child(`/nodes/${domain}`)
                                   .push().key;
                updates[`/nodes/${domain}/${id}`] = node;
                updates[`/users/${uid}/nodes/${placeId}`] = id;
                updates[`/users/${uid}/timestamp`] = timestamp;
              }
              database.ref().update(updates)
                      .then(() => {
                        dispatch(addNodeSuccess);
                        loadNodes();
                      })
                      .catch(error => dispatch(handleError(error)));
            } else {
              dispatch(handleError(status));
            }
          });
        });
      } else {
        const minutes = Math.floor((600000 - timeLimit) / 60000);
        console.log('minutes', minutes);
        dispatch(submitNodeFailure(minutes));
      }
    }
  };
}

export function submitNode(report) {
  return (dispatch, getState) => {
    const state = getState();
    if (report && !isAnon(state)) {
      const timeLimit = getCurrentTimestamp(state) - getUserTimestamp(state);
      if (timeLimit > 600000) {
        dispatch(addNode(report));
      } else {
        const minutes = Math.floor((600000 - timeLimit) / 60000);
        dispatch(submitNodeFailure(minutes));
      }
    }
  };
}

export function getRating(placeId) {
  return (dispatch, getState) => {
    const state = getState();
    const list = getList(state);
    let safe = 0;
    let danger = 0;
    list.forEach((node) => {
      const data = node.toJS();
      if (placeId === data.placeId) {
        if (data.report) {
          if (data.report === 'safe') {
            safe += 1;
          } else if (data.report === 'danger') {
            danger += 1;
          }
        }
      }
    });
    const reports = safe + danger;
    if (reports) {
      const risk = danger / reports;
      let rating = null;
      if (risk <= 0.25) {
        rating = 'Low';
      } else if (risk <= 0.5) {
        rating = 'Moderate';
      } else if (risk <= 0.75) {
        rating = 'High';
      } else {
        rating = 'Extreme';
      }
      dispatch(getRatingSuccess(safe, danger, reports, rating));
    }
  };
}

export function setStyle(style) {
  return (dispatch, getState) => {
    const state = getState();
    const uid = getUid(state);
    const updates = {};
    updates[`users/${uid}/style`] = style;
    database.ref().update(updates);
    if (style === 'light') {
      dispatch(setStyleSuccess(light));
    } else if (style === 'retro') {
      dispatch(setStyleSuccess(retro));
    } else if (style === 'night') {
      dispatch(setStyleSuccess(night));
    } else if (style === 'silver') {
      dispatch(setStyleSuccess(silver));
    } else if (style === 'aubergine') {
      dispatch(setStyleSuccess(aubergine));
    } else {
      dispatch(setStyleSuccess(dark));
    }
  };
}

export function getStyle() {
  return (dispatch, getState) => {
    const state = getState();
    const uid = getUid(state);
    database.ref(`users/${uid}/style`)
            .once('value', (snapshot) => {
              const style = snapshot.val();
              dispatch(setStyle(style));
            });
  };
}

export function changeFilter(filter) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_FILTER,
      payload: filter
    });
  };
}
