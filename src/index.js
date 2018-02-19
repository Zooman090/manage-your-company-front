import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';

import './styles/app.scss';

import { createStore, applyMiddleware, compose } from 'redux';
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

import Root from './js/components/root';

import reducer from './js/reducers/index.js';
import localStorageLoad from './js/middleware/local-storage-load';

const store = createStore(reducer, composeEnhancers(applyMiddleware(localStorageLoad)));
const history = createHashHistory();

store.dispatch({ type: 'INIT' });

render(
  <Provider store={store}>
    <Router history={history}>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('app')
);
