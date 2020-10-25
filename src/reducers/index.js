import { combineReducers } from 'redux';

import user from './user';
import auth from './auth';
import subreddits from './subreddits';

/* root reducer */
export default combineReducers({
  user,
  auth,
  subreddits
});