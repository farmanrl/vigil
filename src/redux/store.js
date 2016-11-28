import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (initialState = {}) => {
  console.log('initializing store');
  let middleware = applyMiddleware(thunk);
  const store = createStore(reducers, initialState, middleware);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
};
