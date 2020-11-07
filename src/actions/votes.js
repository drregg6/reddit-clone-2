import {
  GET_VOTES,
  ADD_VOTE,
  REMOVE_VOTE
} from './types';
import db from '../db';
import firebase from '../firebase';


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


export const upvote = (vote_id, post_id, user_id) => async dispatch => {
  // IF user_id exists in user_upvotes, remove user_id and votes--
  // ELSE IF user_id exists in user_downvotes, remove user_id from downvotes, add user_id to upvotes, votes += 2
  // ELSE user_id does not exist in user_upvotes, add user_id and votes++
  let payload;
  let upvoteFlag = {
    userUpvoted: false,
    userDownvoted: false
  }
  try {
    let upvoteQuery = await db.collection('votes').where('post_id', '==', post_id).where('user_upvotes', 'array-contains', user_id).get();
    upvoteQuery.forEach(doc => {
      if (doc) upvoteFlag.userUpvoted = true;
    });

    let downvoteQuery = await db.collection('votes').where('post_id', '==', post_id).where('user_downvotes', 'array-contains', user_id).get();
    downvoteQuery.forEach(doc => {
      if (doc) upvoteFlag.userDownvoted = true;
    });


    if (upvoteFlag.userUpvoted) {
      await db.collection('votes').doc(vote_id).update({
        user_upvotes: firebase.firestore.FieldValue.arrayRemove(user_id),
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
        votes: firebase.firestore.FieldValue.increment(-1)
      });
    } else if (upvoteFlag.userDownvoted) {
      await db.collection('votes').doc(vote_id).update({
        user_upvotes: firebase.firestore.FieldValue.arrayUnion(user_id),
        user_downvotes: firebase.firestore.FieldValue.arrayRemove(user_id),
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
        votes: firebase.firestore.FieldValue.increment(1)
      });
    } else {
      await db.collection('votes').doc(vote_id).update({
        user_upvotes: firebase.firestore.FieldValue.arrayUnion(user_id),
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
        votes: firebase.firestore.FieldValue.increment(1)
      });
    }

    await db.collection('votes').doc(vote_id).get().then(doc => {
      payload = doc.data();
    });
    
    dispatch({
      type: ADD_VOTE,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}


export const downvote = (vote_id, post_id, user_id) => async dispatch => {
  let payload;
  let upvoteFlag = {
    userUpvoted: false,
    userDownvoted: false
  }

  try {
    let upvoteQuery = await db.collection('votes').where('post_id', '==', post_id).where('user_upvotes', 'array-contains', user_id).get();
    upvoteQuery.forEach(doc => {
      if (doc) upvoteFlag.userUpvoted = true;
    });

    let downvoteQuery = await db.collection('votes').where('post_id', '==', post_id).where('user_downvotes', 'array-contains', user_id).get();
    downvoteQuery.forEach(doc => {
      if (doc) upvoteFlag.userDownvoted = true;
    });


    if (upvoteFlag.userUpvoted) {
      await db.collection('votes').doc(vote_id).update({
        user_upvotes: firebase.firestore.FieldValue.arrayRemove(user_id),
        user_downvotes: firebase.firestore.FieldValue.arrayUnion(user_id),
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
        votes: firebase.firestore.FieldValue.increment(-1)
      });
    } else if (upvoteFlag.userDownvoted) {
      await db.collection('votes').doc(vote_id).update({
        user_downvotes: firebase.firestore.FieldValue.arrayRemove(user_id),
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
        votes: firebase.firestore.FieldValue.increment(-2)
      });
    } else {
      await db.collection('votes').doc(vote_id).update({
        user_downvotes: firebase.firestore.FieldValue.arrayUnion(user_id),
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
        votes: firebase.firestore.FieldValue.increment(-1)
      });
    }

    await db.collection('votes').doc(vote_id).get().then(doc => {
      payload = doc.data();
    });
    
    dispatch({
      type: REMOVE_VOTE,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}