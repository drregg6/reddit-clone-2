import {
  GET_SUBREDDITS
} from '../actions/types';

const initialState = {
  subreddits: [],
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
    default:
      return state;
  }
}