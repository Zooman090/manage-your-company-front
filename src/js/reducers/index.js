import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import companyList from './company-list';

export default combineReducers({
  routing: routerReducer,
  companyList
});