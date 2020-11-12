import React from 'react';
import PropTypes from 'prop-types';
import commentTimeFormatter from '../../utils/commentTimeFormatter';

const UserMobileComment = ({
  comment,
  user,
  currentUser,
  deleteComment
}) => {
  return (
    <div className="card mobile-card">
      {
        user !== undefined && (
          <div className="card-header">
            <span className="card-header-title">
              <figure className="mb-0 mr-3 image is-24x24">
                <img
                  className="is-rounded"
                  alt=""
                  src={user.image}
                />
              </figure>
              {user.name}
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
        (user !== null && user.id === currentUser.id) && (
          <button className="delete-button" onClick={() => deleteComment(comment.id)}>X</button>
        )
      }
    </div>
  )
}

UserMobileComment.propTypes = {
  comment: PropTypes.object,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  deleteComment: PropTypes.func,
}

export default UserMobileComment;