import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReplyForm from './ReplyForm';
import CommentReply from './CommentReply';
import commentTimeFormatter from '../../utils/commentTimeFormatter';

import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { deleteComment } from '../../actions/comments';

const PostComment = ({
  fetchUsers,
  currentUser,
  deleteComment,
  users: { users },
  auth: { isLoggedIn },
  comment,
  comments
}) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [ replyForm, toggleReplyForm ] = useState(false);

  // Get author information for the comment
  let author;
  const getAuthorById = user_id => {
    return users.filter(user => user.id === user_id);
  }

  if (users.length !== 0) {
    author = getAuthorById(comment.user_id)[0];
  }

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
          <p>
            { comment.content }
          </p>
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
              <button className="button is-primary is-small" onClick={() => toggleReplyForm(!replyForm)}>Reply</button>
            )
          }
          {
            replyForm && (
              <div className="media">
                  <div className="media-content">
                    <ReplyForm
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
            ( childrenComments.length !== 0 && childrenComments[0].author !== undefined) && (
              childrenComments.map(comment => {
                return (
                  <CommentReply
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
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.object,
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    fetchUsers,
    deleteComment
  }
)(PostComment);