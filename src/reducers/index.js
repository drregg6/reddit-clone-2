import { combineReducers } from 'redux';

import users from './users';
import auth from './auth';
import posts from './posts';
import subreddits from './subreddits';
import votes from './votes';

/* root reducer */
export default combineReducers({
  users,
  auth,
  posts,
  subreddits,
  votes
});