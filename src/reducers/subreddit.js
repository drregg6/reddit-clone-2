import {
  GET_SUBREDDIT,
  CLEAR_SUBREDDIT
} from '../actions/types';

const initialState = {
  subreddit: null,
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
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