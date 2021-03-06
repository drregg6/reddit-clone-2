import React, { useState } from 'react';
import PropTypes from 'prop-types';
import commentTimeFormatter from '../../utils/commentTimeFormatter';

import MarkedText from '../layout/MarkedText';
import ReplyForm from './ReplyForm';
import CommentReply from './CommentReply';
import UpdateCommentForm from '../updateComment/UpdateCommentForm';

import { connect } from 'react-redux';
import {
  addComment,
  updateComment,
  deleteComment
} from '../../actions/comments';

const PostComment = ({
  currentUser,
  isLoggedIn,
  deleteComment,
  addComment,
  updateComment,
  users,
  comment,
  comments
}) => {
  const [ replyForm, toggleReplyForm ] = useState(false);
  const [ updateForm, toggleUpdateForm ] = useState(false);

  // Get author information for the comment
  const getAuthorById = user_id => {
    return users.filter(user => user.id === user_id);
  }
  const author = getAuthorById(comment.user_id)[0];

  // Find children comments of the parent comment
  let childrenComments = [];
  const getChildrenComments = parent_id => {
    let tempChildrenComments = comments.filter(comment => comment.parent_id === parent_id);
    tempChildrenComments.map(comment => {
      comment.author = users.filter(user => user.id === comment.user_id)[0];
    });
    return tempChildrenComments;
  }
  childrenComments = getChildrenComments(comment.id);

  const handleToggleUpdateForm = () => {
    if (replyForm) toggleReplyForm(false);
    toggleUpdateForm(!updateForm);
  }
  const handleToggleReplyForm = () => {
    if (updateForm) toggleUpdateForm(false);
    toggleReplyForm(!replyForm);
  }

  return (
    <div className="comment my-2">
      <div className="media">
        <div className="media-left">
          <figure className="image">
            <img
              alt="Author avatar"
              src={ author !== undefined && author.image }
            />
          </figure>
        </div>
        <div className="media-content">
          <p className="has-text-weight-bold">
            { author !== undefined && author.name }
          </p>
          <MarkedText>{comment.content}</MarkedText>
          <div className="level">
            <div className="level-left">
              <div className="level-item is-size-7">
                <span className="created-at mr-2"><span className="has-text-weight-bold">Created on:</span> {commentTimeFormatter(comment.created_at.seconds)}</span>
                <span className="updated-at ml-2"><span className="has-text-weight-bold">Updated on:</span> {commentTimeFormatter(comment.updated_at.seconds)}</span>
              </div>
            </div>
          </div>
          {
            isLoggedIn && (
              <button className="button is-primary is-small" onClick={() => handleToggleReplyForm()}>Reply</button>
            )
          }
          {
            currentUser.id === comment.user_id && (
              <button className="button is-warning is-small" onClick={() => handleToggleUpdateForm()}>Edit</button>
            )
          }
          {
            replyForm && (
              <div className="media">
                  <div className="media-content">
                    <ReplyForm
                      addComment={addComment}
                      currentUser={currentUser}
                      subreddit_id={comment.subreddit_id}
                      comment_id={comment.id}
                      post_id={comment.post_id}
                      toggleReplyForm={toggleReplyForm}
                    />
                  </div>
              </div>
            )
          }
          {
            updateForm && (
              <div className="media">
                  <div className="media-content">
                    <UpdateCommentForm
                      updateComment={updateComment}
                      comment_id={comment.id}
                      toggleUpdateForm={toggleUpdateForm}
                      oldContent={comment.content}
                    />
                  </div>
              </div>
            )
          }
          {
            ( childrenComments.length !== 0 && childrenComments[0].author !== undefined) && (
              childrenComments.map(comment => {
                return (
                  <CommentReply
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                  />
                )
              })
            )
          }
        </div>
        {
          currentUser.id === comment.user_id && (
            <div className="media-right">
              <button className="delete" onClick={() => deleteComment(comment.id)}>X</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

PostComment.propTypes = {
  isLoggedIn: PropTypes.bool,
  users: PropTypes.array,
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  addComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

export default connect(
  null,
  {
    addComment,
    updateComment,
    deleteComment
  }
)(PostComment);