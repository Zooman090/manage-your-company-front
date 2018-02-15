import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import companyList from './company-list';
import staffList from './staff.js';
import user from './user';

export default combineReducers({
  routing: routerReducer,
  companyList,
  staffList,
  user
});
