import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './css/app.scss';

import { createStore, applyMiddleware, compose } from 'redux';
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

import Header from './js/components/header';
import Main from './js/components/main-page/index.jsx';
import CreateCompany from './js/components/company/create';
import CreateStaff from './js/components/staff/create.jsx';
import SignUp from './js/components/sign/up.jsx';
import SignIn from './js/components/sign/in.jsx';

import Dialog from './js/components/dialog';

import reducer from './js/reducers/index.js';
import localStorageLoad from './js/middleware/local-storage-load';

const store = createStore(reducer, composeEnhancers(applyMiddleware(localStorageLoad)));

store.dispatch({ type: 'INIT' });

render(
  <Provider store={ store }>
    <Router>
      <div>
        <Dialog />
        <Header />
        <Route exact path="/" component={Main} />
        <Route path="/company-create" component={CreateCompany} />
        <Route path="/staff-create" component={CreateStaff} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
