export function getUser(state) {
  return state.user;
}

export function getUserNodeList(state) {
  return getUser(state).userNodeList;
}

export function getUserContactList(state) {
  return getUser(state).contactList;
}

export function getUserDirectionList(state) {
  return getUser(state).directionList;
}

export function getUserStyle(state) {
  return getUser(state).style;
}

export function getUserTimestamp(state) {
  return getUser(state).timestamp;
}

export function getUserDomain(state) {
  return getUser(state).domain;
}

export function getUserResources(state) {
  return getUser(state).resources;
}
