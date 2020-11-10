import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  CLEAR_COMMENTS
} from '../actions/types';

const initialState = {
  comments: [],
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_COMMENTS:
      return {
        ...state,
        isLoading: false,
        comments: payload
      }
    case ADD_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: [...state.comments, payload]
      }
    case DELETE_COMMENT:
      let deleteComment = state.comments.filter(comment => comment.id !== payload);
      return {
        ...state,
        isLoading: false,
        comments: [...deleteComment]
      }
    case CLEAR_COMMENTS:
      return {
        ...state,
        isLoading: false,
        comments: []
      }
    default:
      return state;
  }
}