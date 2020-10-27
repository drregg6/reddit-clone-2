import {
  GET_SUBREDDITS,
  GET_SUBREDDIT,
  CLEAR_SUBREDDIT
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

export const fetchSubreddit = (params) => async dispatch => {
  dispatch({ type: CLEAR_SUBREDDIT });
  const { name } = params;
  try {
    let payload = {};
    const res = await db.collection('subreddits').where('name', '==', name).get();
    res.forEach(doc => {
      payload = {...doc.data()};
    });
    dispatch({
      type: GET_SUBREDDIT,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}