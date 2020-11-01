import {
  GET_VOTES,
  ADD_VOTE,
  REMOVE_VOTE
} from '../actions/types';

const initialState = {
  votes: [],
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_VOTES:
      return {
        ...state,
        isLoading: false
      }
      case ADD_VOTE:
        return {
          ...state,
          isLoading: false
        }
        case REMOVE_VOTE:
          return {
            ...state,
            isLoading: false
          }
    default:
      return state;
  }
}