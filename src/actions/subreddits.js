import {
  GET_SUBREDDITS
} from './types';
import db from '../db';

export const fetchSubreddits = () => async dispatch => {
  try {
    let payload = [];
    const res = await db.collection('subreddits').get();
    res.forEach(doc => {
      payload.push(doc.data());
    })
    dispatch({
      type: GET_SUBREDDITS,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}