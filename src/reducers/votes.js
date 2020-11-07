import {
  GET_VOTES,
  ADD_VOTE,
  ADD_VOTES,
  REMOVE_VOTE,
  DELETE_VOTE
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
        votes: [...payload],
        isLoading: false
      }
    case ADD_VOTES:
      return {
        ...state,
        votes: [...state.votes, payload],
        isLoading: false
      }
    case ADD_VOTE:
      // filter out the vote object that contains matching post_id
      let addVote = state.votes.filter(vote => vote.id !== payload.id);

      // then insert the payload object
      return {
        ...state,
        votes: [...addVote, payload],
        isLoading: false
      }
    case REMOVE_VOTE:
      // filter out the vote object that contains matching post_id
      let removeVote = state.votes.filter(vote => vote.id !== payload.id);

      // then insert the payload object
      return {
        ...state,
        votes: [...removeVote, payload],
        isLoading: false
      }
    case DELETE_VOTE:
      let deleteVote = state.votes.filter(vote => vote.id !== payload);

      return {
        ...state,
        isLoading: false,
        votes: [...deleteVote]
      }
    default:
      return state;
  }
}