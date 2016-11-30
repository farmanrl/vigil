import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import './index.css';
import Root from './components/Root';
import configureStore from './redux/store';
import { initAuth } from './redux/auth';

const store = configureStore();
const rootElement = document.getElementById('root');

function render(Root) {
  ReactDOM.render(
    <Root store={store} history={browserHistory} />,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    render(require('./components/Root').default);
  });
}

initAuth(store.dispatch)
  .then(() => render(Root))
  .catch(error => console.error(error)); // eslint-disable-line no-console
