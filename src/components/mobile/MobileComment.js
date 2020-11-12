import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getDocById from '../../utils/getDocById';
import commentTimeFormatter from '../../utils/commentTimeFormatter';

import ReplyForm from '../post/ReplyForm';
import MobileCommentReply from './MobileCommentReply';

import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comments';

const MobileComment = ({
  deleteComment,
  isLoggedIn,
  currentUser,
  comment,
  users,
  comments
}) => {
  const [ replyForm, toggleReplyForm ] = useState(false);
  const author = getDocById(users, comment.user_id);
  let childrenComments = [];
  const getChildrenComments = parent_id => {
    let tempChildrenComments = comments.filter(comment => comment.parent_id === parent_id);
    tempChildrenComments.map(comment => {
      comment.author = getDocById(users, comment.user_id);
    });
    return tempChildrenComments;
  }
  childrenComments = getChildrenComments(comment.id);
  return (
    <div className="card mobile-card">
      {
        author !== undefined && (
          <div className="card-header">
            <span className="card-header-title">
              <figure className="mb-0 mr-3 image is-24x24">
                <img
                  className="is-rounded"
                  alt=""
                  src={author.image}
                />
              </figure>
              <Link to={`/u/${author.id}`}>{author.name}</Link>
            </span>
          </div>
        )
      }
      <div className="card-content">
        <div className="content">
          { comment.content }
          <p className="is-size-7 mt-3 mb-0">
            <span className="is-italic">Created</span> {commentTimeFormatter(comment.created_at.seconds)}
          </p>
          <p className="is-size-7 mt-0 mb-0">
            <span className="is-italic">Updated</span> {commentTimeFormatter(comment.updated_at.seconds)}
          </p>
        </div>
      </div>
      {
        isLoggedIn && (
          <footer className="card-footer" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <button className="button is-primary is-small" style={{ width: '100%' }} onClick={() => toggleReplyForm(!replyForm)}>Reply</button>
            {
              replyForm && (
                <ReplyForm
                  currentUser={currentUser}
                  subreddit_id={comment.subreddit_id}
                  comment_id={comment.id}
                  post_id={comment.post_id}
                  toggleReplyForm={toggleReplyForm}
                />
              )
            }
            {
              (childrenComments.length !== 0 && childrenComments[0].author !== undefined) && (
                childrenComments.map(comment => {
                  return (
                    <MobileCommentReply
                      key={comment.id}
                      comment={comment}
                      currentUser={currentUser}
                      deleteComment={deleteComment}
                    />
                  )
                })
              )
            }
          </footer>
        )
      }
      {
        currentUser.id === comment.user_id && (
          <button className="delete-button" onClick={() => deleteComment(comment.id)}>X</button>
        )
      }
    </div>
  )
}

MobileComment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  currentUser: PropTypes.object,
  comment: PropTypes.object.isRequired,
  users: PropTypes.array,
}

export default connect(
  null,
  { deleteComment }
)(MobileComment);