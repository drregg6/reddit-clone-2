import { combineReducers } from 'redux';

import user from './user';
import auth from './auth';

/* root reducer */
export default combineReducers({
  user,
  auth
});