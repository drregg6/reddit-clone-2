import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  CLEAR_USER
} from '../actions/types';

const initialState = {
  users: [],
  user: null,
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_USERS:
      return {
        ...state,
        users: [...payload],
        isLoading: false
      }
    case GET_USER:
      return {
        ...state,
        isLoading: false,
        user: payload
      }
    case UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        user: payload
      }
    case CLEAR_USER:
      return {
        ...state,
        isLoading: false,
        user: null
      }
    default:
      return state;
  }
}