import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { nodesReducer } from './nodes';
import { userReducer } from './user';

export default combineReducers({
  auth: authReducer,
  nodes: nodesReducer,
  user: userReducer,
});
