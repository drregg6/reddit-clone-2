import {
  GET_SUBREDDITS,
  GET_SUBREDDIT,
  CLEAR_SUBREDDIT
} from '../actions/types';

const initialState = {
  subreddits: [],
  subreddit: null,
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_SUBREDDITS:
      return {
        ...state,
        subreddits: payload,
        isLoading: false
      }
    case GET_SUBREDDIT:
      return {
        ...state,
        subreddit: payload,
        isLoading: false
      }
    case CLEAR_SUBREDDIT:
      return {
        ...state,
        subreddit: null,
        isLoading: false
      }
    default:
      return state;
  }
}