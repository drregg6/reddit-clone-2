import {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  CLEAR_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_POSTS:
      return {
        ...state,
        isLoading: false,
        posts: [...payload]
      }
    case CREATE_POST:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, payload]
      }
    default:
      return state;
  }
}