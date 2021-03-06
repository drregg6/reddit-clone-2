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


export const createSubreddit = (body, history) => async dispatch => {
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
    });
    if (history) {
      history.push(`/r/${newSubreddit.name}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}


export const updateSubreddit = body => async dispatch => {
  try {
    await db.collection('subreddits').doc(body.id).set(body);
    
    dispatch({
      type: UPDATE_SUBREDDIT,
      payload: body
    });
  } catch (error) {
    console.error(error.message);
  }
}


export const deleteSubreddit = (subreddit_id, history) => async dispatch => {
  if (window.confirm('Are you sure? This action cannot be undone!')) {
    try {
      // Delete associated posts
      await db.collection('posts').where('subreddit_id', '==', subreddit_id).get().then(querySnapshot => {
        let batch = db.batch();

        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      });
      // Delete associated votes
      await db.collection('votes').where('subreddit_id', '==', subreddit_id).get().then(querySnapshot => {
        let batch = db.batch();

        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      });
      // Delete associated comments
      await db.collection('comments').where('subreddit_id', '==', subreddit_id).get().then(querySnapshot => {
        let batch = db.batch();

        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      });

      await db.collection('subreddits').doc(subreddit_id).delete();

      dispatch({
        type: DELETE_SUBREDDIT,
        payload: subreddit_id
      });
      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  }
}