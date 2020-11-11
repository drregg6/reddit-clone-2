import {
  GET_SUBREDDITS,
  GET_SUBREDDIT,
  CREATE_SUBREDDIT,
  UPDATE_SUBREDDIT,
  DELETE_SUBREDDIT,
  CLEAR_SUBREDDIT
} from './types';
import db from '../db';
import firebase from '../firebase';

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


export const createSubreddit = body => async dispatch => {
  try {
    // Create an ID
    const doc = db.collection('subreddits').doc();
    let newSubreddit = {...body};
    newSubreddit.id = doc.id;
    newSubreddit.created_at = firebase.firestore.FieldValue.serverTimestamp();

    await db.collection('subreddits').doc(newSubreddit.id).set(newSubreddit);
    dispatch({
      type: CREATE_SUBREDDIT,
      payload: newSubreddit
    })
  } catch (error) {
    console.error(error.message);
  }
}


export const updateSubreddit = body => async dispatch => {
  try {
    await db.collection('subreddits').doc(body.id).set(body);

    // Delete associated posts

    // Delete associated votes

    // Delete associated comments

    
    dispatch({
      type: UPDATE_SUBREDDIT,
      payload: body
    });
  } catch (error) {
    console.error(error.message);
  }
}


export const deleteSubreddit = id => async dispatch => {
  try {
    await db.collection('subreddits').doc(id).delete();
    dispatch({
      type: DELETE_SUBREDDIT,
      payload: id
    });
  } catch (error) {
    console.error(error.message);
  }
}