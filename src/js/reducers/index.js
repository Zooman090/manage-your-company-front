import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import companiesList from './company-list';
import staffList from './staff.js';
import search from './search';
import user from './user';

export default combineReducers({
  routing: routerReducer,
  companiesList,
  staffList,
  search,
  user
});
