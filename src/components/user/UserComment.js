import React from 'react';
import PropTypes from 'prop-types';
import commentTimeFormatter from '../../utils/commentTimeFormatter';
import MarkedText from '../layout/MarkedText';

const UserComment = ({
  comment,
  user,
  currentUser,
  deleteComment
}) => {
  return (
    <div className="box">
      <div className="media">
        <div className="media-left align-center">
          <figure className="image is-64x64 center-image">
            <img
              src={ user.image }
              alt='user avatar'
            />
          </figure>
        </div>
        <div className="media-content">
          <p className="has-text-weight-bold">
            { user.name }
          </p>
          <div className="mb-3">
            <MarkedText>{ comment.content }</MarkedText>
          </div>
          <div className="level">
            <div className="level-left">
              <div className="level-item is-size-7">
                <span className="created-at mr-2"><span className="has-text-weight-bold">Created on:</span> {commentTimeFormatter(comment.created_at.seconds)}</span>
                <span className="updated-at ml-2"><span className="has-text-weight-bold">Updated on:</span> {commentTimeFormatter(comment.updated_at.seconds)}</span>
              </div>
            </div>
          </div>
        </div>
        {
          (user !== null && user.id === currentUser.id) && (
            <div className="media-right">
              <button
                className="delete"
                onClick={() => deleteComment(comment.id)}
              >
                X
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

UserComment.propTypes = {
  comment: PropTypes.object,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  deleteComment: PropTypes.func,
}

export default UserComment;