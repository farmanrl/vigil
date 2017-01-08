import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { nodesReducer } from './nodes';

export default combineReducers({
  auth: authReducer,
  nodes: nodesReducer,
});
