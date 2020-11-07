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
    case GET_POST:
      return {
        ...state,
        isLoading: false,
        post: payload
      }
    case CREATE_POST:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, payload]
      }
    case DELETE_POST:
      // go through state.posts and filter out the posts with post.id === payload
      let newPosts = state.posts.filter(post => post.id !== payload);

      return {
        ...state,
        isLoading: false,
        posts: [...newPosts]
      }
    case CLEAR_POST:
      return {
        ...state,
        isLoading: false,
        post: null
      }
    default:
      return state;
  }
}