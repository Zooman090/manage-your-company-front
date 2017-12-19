import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import './css/app.scss';

import { createStore } from 'redux';

import Main from './js/components/main-page/index.jsx';
import reducer from './js/reducers/index.js';

const store = createStore(reducer),
  history = syncHistoryWithStore(createBrowserHistory(), store);

render(
  <Provider store={ store }>
      <Main />
  </Provider>,
  document.getElementById('app')
);