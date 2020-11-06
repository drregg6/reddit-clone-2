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
  // within all instances, updated_at time needs to be changed!!

  // IF user_id exists in user_upvotes, remove user_id and votes--

  // ELSE IF user_id exists in user_downvotes, remove user_id from downvotes, add user_id to upvotes, votes += 2

  // ELSE user_id does not exist in user_upvotes, add user_id and votes++

  // Payload should be the updated object
  try {
    console.log(post_id);
    console.log(user_id);
  } catch (error) {
    console.error(error.message);
  }
}


export const downvote = (post_id, user_id) => async dispatch => {
  // within all instances, updated_at time needs to be changed!!

  // IF user_id exists in user_downvotes, remove user_id and votes++

  // ELSE IF user_id exists in user_upvotes, remove user_id from upvotes, add user_id to downvotes, votes -= 2

  // ELSE user_id does not exist in user_downvotes, add user_id and votes--

  // Payload should be the updated object
  try {
    console.log(post_id);
    console.log(user_id);
  } catch (error) {
    console.error(error.message);
  }
}