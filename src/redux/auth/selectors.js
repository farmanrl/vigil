export function getAuth(state) {
  return state.auth;
}

export function getUid(state) {
  return getAuth(state).uid;
}

export function isAuthenticated(state) {
  return getAuth(state).authenticated;
}

export function isAnon(state) {
  return getAuth(state).isAnon;
}

export function getDomain(state) {
  return getAuth(state).domain;
}

export function getUserNodes(state) {
  return getAuth(state).nodes;
}

export function getHome(state) {
  return getAuth(state).home;
}

export function getFavorites(state) {
  return getAuth(state).favorites;
}

export function getPlaces(state) {
  return getAuth(state).places;
}

export function getUserTimestamp(state) {
  return getAuth(state).timestamp;
}
