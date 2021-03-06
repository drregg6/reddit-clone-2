import {
  GET_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  CLEAR_COMMENTS
} from './types';
import db from '../db';
import firebase from '../firebase';

export const fetchAllComments = () => async dispatch => {
  let payload = [];
  try {
    dispatch({ type: CLEAR_COMMENTS });

    const res = await db.collection('comments').get()
    res.forEach(doc => {
      payload.push(doc.data());
    });
    payload = payload.sort((obj1, obj2) => {
      return obj2.created_at - obj1.created_at
    });

    dispatch({
      type: GET_COMMENTS,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}



export const fetchUserComments = user_id => async dispatch => {
  let payload = [];
  try {
    dispatch({ type: CLEAR_COMMENTS });
    const res = await db.collection('comments').where('user_id', '==', user_id).get();
    res.forEach(doc => {
      payload.push(doc.data());
    });
    payload = payload.sort((obj1, obj2) => {
      return obj2.created_at - obj1.created_at
    });

    dispatch({
      type: GET_COMMENTS,
      payload
    })
  } catch (error) {
    
  }
}


export const fetchPostComments = post_id => async dispatch => {
  let payload = [];
  try {
    dispatch({ type: CLEAR_COMMENTS });
    const res = await db.collection('comments').where('post_id', '==', post_id).get();
    res.forEach(doc => {
      payload.push(doc.data());
    });
    payload = payload.sort((obj1, obj2) => {
      return obj2.created_at - obj1.created_at
    });

    dispatch({
      type: GET_COMMENTS,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}



export const addComment = (body) => async dispatch => {
  // Create an ID for the comment
  let newDoc = db.collection('comments').doc();

  // Create the newComment to be sent to the database
  let newComment = {...body};
  newComment.id = newDoc.id;
  newComment.created_at = firebase.firestore.FieldValue.serverTimestamp();
  newComment.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await db.collection('comments').doc(newComment.id).set(newComment);
    dispatch({
      type: ADD_COMMENT,
      payload: newComment
    });
  } catch (error) {
    console.error(error.message);
  }
}


export const updateComment = body => async dispatch => {
  let payload;
  try {
    let updatedComment = {...body};
    updatedComment.updated_at = firebase.firestore.FieldValue.serverTimestamp();

    await db.collection('comments').doc(updatedComment.id).update(updatedComment);
    await db.collection('comments').doc(updatedComment.id).get().then(doc => {
      payload = doc.data();
    });
    
    dispatch({
      type: UPDATE_COMMENT,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}


export const deleteComment = (comment_id) => async dispatch => {
  try {
    await db.collection('comments').doc(comment_id).delete();
    dispatch({
      type: DELETE_COMMENT,
      payload: comment_id
    });
  } catch (error) {
    console.error(error.message);
  }
}