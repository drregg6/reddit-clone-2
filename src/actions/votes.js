import {
  GET_VOTES,
  ADD_VOTE,
  REMOVE_VOTE
} from './types';
import db from '../db';


export const fetchVotes = () => async dispatch => {
  try {
    let payload = [];
    const res = await db.collection('votes').get();
    res.forEach(doc => {
      payload.push(doc.data());
    });
    dispatch({
      type: GET_VOTES,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}


export const upvote = (post_id, user_id) => async dispatch => {
  try {
    console.log(post_id);
    console.log(user_id);
  } catch (error) {
    console.error(error.message);
  }
}


export const downvote = (post_id, user_id) => async dispatch => {
  try {
    console.log(post_id);
    console.log(user_id);
  } catch (error) {
    console.error(error.message);
  }
}