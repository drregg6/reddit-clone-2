import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import ReplyForm from './ReplyForm';

import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { deleteComment } from '../../actions/comments';

const PostComment = ({
  fetchUsers,
  currentUser,
  deleteComment,
  users: { users },
  auth: { isLoggedIn },
  comment
}) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [ replyForm, toggleReplyForm ] = useState(false);

  let author;
  const getAuthorById = user_id => {
    return users.filter(user => user.id === user_id);
  }

  if (users.length !== 0) {
    author = getAuthorById(comment.user_id)[0];
  }

  let created_at;
  let updated_at;
  if (comment.created_at.seconds === undefined) {
    created_at = 'New Comment!';
  } else {
    created_at = format(new Date(comment.created_at.seconds * 1000), 'MM-dd-yyyy HH:mm');
  }
  if (comment.updated_at.seconds === undefined) {
    updated_at = 'New Comment!';
  } else {
    updated_at = format(new Date(comment.updated_at.seconds * 1000), 'MM-dd-yyyy HH:mm');
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
          <p>
            { comment.content }
          </p>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <span className="created-at mr-2"><span className="has-text-weight-bold">Created on:</span> {created_at}</span>
                <span className="updated-at ml-2"><span className="has-text-weight-bold">Updated on:</span> {updated_at}</span>
              </div>
            </div>
          </div>
        </div>
        {
          currentUser.id === comment.user_id && (
            <div className="media-right">
              <button className="delete" onClick={() => deleteComment(comment.id)}>X</button>
            </div>
          )
        }
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
                />
              </div>
          </div>
        )
      }
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