import {
  GET_USERS
} from '../actions/types';

const initialState = {
  users: []
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
    default:
      return state;
  }
}