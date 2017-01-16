import * as nodesActions from './actions';

export { nodesActions };
export * from './types';
export { nodesReducer } from './reducer';
export {
  getNodes,
  getList,
  getSafe,
  getDanger,
  getFilter,
  getCurrentLocation,
  getCurrentTimestamp,
  getValid,
} from './selectors';

export function initNodes(dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(nodesActions.loadNodes());
    resolve();
  });
}
