import {
  GET_COMMENTS,
  ADD_COMMENT
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
    default:
      return state;
  }
}