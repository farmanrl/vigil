export function getAuth(state) {
  return state.auth;
}

export function getId(state) {
  return getAuth(state).id;
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

export function getResources(state) {
  return getAuth(state).resources;
}
