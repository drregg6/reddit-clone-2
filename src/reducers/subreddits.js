import {
  GET_SUBREDDITS,
  GET_SUBREDDIT,
  CREATE_SUBREDDIT,
  UPDATE_SUBREDDIT,
  DELETE_SUBREDDIT,
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
    case CREATE_SUBREDDIT:
      return {
        ...state,
        isLoading: false,
        subreddits: [...state.subreddits, payload]
      }
    case UPDATE_SUBREDDIT:
      const updatedSubreddits = state.subreddits.filter(subreddit => subreddit.id !== payload.id);
      return {
        ...state,
        isLoading: false,
        subreddits: [...updatedSubreddits, payload]
      }
    case DELETE_SUBREDDIT:
      const deletedSubreddits = state.subreddits.filter(subreddit => subreddit.id !== payload);
      return {
        ...state,
        isLoading: false,
        subreddits: [...deletedSubreddits]
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