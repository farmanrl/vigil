import { database, auth } from '../firebase';
import {
  dark,
  light,
  retro,
  desert,
  golddust,
  hopper,
  avocado,
  spooky,
  colorblind,
} from '../../components/MapStyles';

const GoogleMapsLoader = require('google-maps');

export function loadUserNode(node) {
  return {
    type: 'LOAD_USER_NODE',
    payload: node
  };
}

export function loadUserDirection(direction) {
  return {
    type: 'LOAD_USER_DIRECTION',
    payload: direction
  };
}

export function loadUserHome(direction) {
  return {
    type: 'LOAD_USER_HOME',
    payload: direction
  };
}

export function loadUserContact(contact) {
  return {
    type: 'LOAD_USER_CONTACT',
    payload: contact
  };
}

export function loadUserStyle(style) {
  return {
    type: 'LOAD_USER_STYLE',
    payload: style
  };
}

export function loadUserTimestamp(timestamp) {
  return {
    type: 'LOAD_USER_TIMESTAMP',
    payload: timestamp
  };
}

export function loadUserResources(domain, resources) {
  return {
    type: 'LOAD_USER_RESOURCES',
    payload: { domain, resources }
  };
}

export function deleteUserDirection(direction) {
  return {
    type: 'DELETE_USER_DIRECTION',
    payload: direction
  };
}

export function deleteUserContact(contact) {
  return {
    type: 'DELETE_USER_CONTACT',
    payload: contact
  };
}

export function setRoute(location) {
  return {
    type: 'SET_ROUTE',
    payload: location
  };
}

export function submitUserStyle(style) {
  return (dispatch) => {
    dispatch({
      type: 'SUBMIT_USER_STYLE',
      payload: { style }
    });
    const uid = auth.currentUser.uid;
    const user = database.ref(`users/${uid}/style`);
    user.set(style);
  };
}

export function submitUserContact(name, number) {
  return (dispatch) => {
    dispatch({
      type: 'SUBMIT_USER_CONTACT',
      payload: { name, number }
    });
    const uid = auth.currentUser.uid;
    const user = database.ref(`users/${uid}/contacts`);
    const contact = user.push();
    contact.set({ name, number });
  };
}

export function removeUserContact(contact) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_USER_CONTACT',
      payload: contact
    });
    const uid = auth.currentUser.uid;
    const data = database.ref(`users/${uid}/contacts/${contact.key}`);
    data.remove();
  };
}

export function removeUserDirection(direction) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_USER_DIRECTION',
      payload: direction
    });
    const uid = auth.currentUser.uid;
    const directions = database.ref(`users/${uid}/directions/`);
    if (direction.type === 'home') {
      const data = directions.child('home/');
      data.remove();
    } else if (direction.type === 'favorite') {
      const data = directions.child(`favorites/${direction.key}`);
      data.remove();
    } else {
      const data = directions.child(`places/${direction.key}`);
      data.remove();
    }
  };
}

export function submitUserDirection(type, name) {
  return (dispatch) => {
    dispatch({
      type: 'SUBMIT_USER_DIRECTION',
      payload: { type, name }
    });
    const uid = auth.currentUser.uid;
    const directions = database.ref(`users/${uid}/directions/${type}`);
    navigator.geolocation.getCurrentPosition((position) => {
      GoogleMapsLoader.load((google) => {
        const geocoder = new google.maps.Geocoder();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const location = { lat, lng };
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK') {
            const place = results[0].place_id;
            const address = results[0].formatted_address;
            const node = { name, place, address, location };
            if (type === 'home') {
              directions.set(node);
            } else {
              const direction = directions.push();
              direction.set(node);
            }
          }
        });
      });
    });
  };
}

export function loadUser(user) {
  if (user) {
    const uid = user.uid;
    return (dispatch) => {
      dispatch({
        type: 'LOAD_USER',
      });
      if (!user.isAnonymous) {
        if (user.email) {
          dispatch(handleUser(user.email));
        }
        const ref = database.ref(`users/${uid}/`);
        ref.child('nodes/')
           .on('child_added', ((node) => {
             dispatch(loadUserNode({
               key: node.key,
               node: node.val()
             }));
           }));
        ref.child('directions/home')
           .on('value', ((direction) => {
             if (direction.val()) {
               dispatch(loadUserHome({
                 type: 'home',
                 key: direction.key,
                 direction: direction.val()
               }));
             } else {
               dispatch(deleteUserDirection({
                 key: 'home',
               }));
             }
           }));
        ref.child('directions/favorites')
           .on('child_added', ((direction) => {
             dispatch(loadUserDirection({
               type: 'favorite',
               key: direction.key,
               direction: direction.val()
             }));
           }));
        ref.child('directions/favorites')
           .on('child_removed', ((direction) => {
             dispatch(deleteUserDirection({
               type: 'favorite',
               key: direction.key,
               direction: direction.val()
             }));
           }));
        ref.child('directions/places')
           .on('child_added', ((direction) => {
             dispatch(loadUserDirection({
               type: 'place',
               key: direction.key,
               direction: direction.val()
             }));
           }));
        ref.child('directions/places')
           .on('child_removed', ((direction) => {
             dispatch(deleteUserDirection({
               type: 'place',
               key: direction.key,
               direction: direction.val()
             }));
           }));
        ref.child('contacts/')
           .on('child_added', ((contact) => {
             dispatch(loadUserContact({
               key: contact.key,
               contact: contact.val()
             }));
           }));
        ref.child('contacts/')
           .on('child_removed', ((contact) => {
             dispatch(deleteUserContact({
               key: contact.key,
               contact: contact.val()
             }));
           }));
        ref.child('style')
           .on('value', ((data) => {
             const style = data.val();
             if (style === 'light') {
               dispatch(loadUserStyle(light));
             } else if (style === 'retro') {
               dispatch(loadUserStyle(retro));
             } else if (style === 'desert') {
               dispatch(loadUserStyle(desert));
             } else if (style === 'golddust') {
               dispatch(loadUserStyle(golddust));
             } else if (style === 'avocado') {
               dispatch(loadUserStyle(avocado));
             } else if (style === 'hopper') {
               dispatch(loadUserStyle(hopper));
             } else if (style === 'spooky') {
               dispatch(loadUserStyle(spooky));
             } else if (style === 'colorblind') {
               dispatch(loadUserStyle(colorblind));
             } else {
               dispatch(loadUserStyle(dark));
             }
           }));
        ref.child('timestamp/')
           .on('value', ((time) => {
             dispatch(loadUserTimestamp(time.val()));
           }));
      } else {
        dispatch(loadUserStyle(dark));
      }
    };
  }
  return null;
}

export function handleUser(email) {
  let domain = email.replace(/.*@/, '');
  const index = domain.indexOf('.');
  domain = domain.substring(0, index);
  return (dispatch) => {
    const ref = database.ref('domains/');
    ref.once('value', ((snapshot) => {
      const child = snapshot.child(domain);
      if (child.exists()) {
        const resources = child.val();
        dispatch(loadUserResources(domain, resources));
      } else {
        const entry = {};
        entry[domain] = { valid: false };
        ref.update(entry);
      }
    }));
  };
}

export function unloadUser(uid) {
  return (dispatch) => {
    dispatch({ type: 'UNLOAD_USER' });
    const user = database.ref(`users/${uid}/`);
    user.child('contacts/').off();
    user.child('directions/home').off();
    user.child('directions/favorites').off();
    user.child('directions/places').off();
    user.child('nodes/').off();
    user.child('timestamp/').off();
    user.child('style/').off();
    const nodes = database.ref('nodes/');
    nodes.off();
  };
}
