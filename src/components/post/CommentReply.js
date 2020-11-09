import React from 'react';
import PropTypes from 'prop-types';
import commentTimeFormatter from '../../utils/commentTimeFormatter';

import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comments';

const CommentReply = ({
  deleteComment,
  comment,
  currentUser
}) => {
  let author = {
    name: 'Anonymous',
    image: 'https://bulma.io/images/placeholders/96x96.png'
  }
  if (comment.author !== undefined) {
    author.name = comment.author.name;
    author.image = comment.author.image;
  }
  return (
    <div className="media my-2">
      <div className="media-left">
        <figure className="image">
          <img
            alt="user avatar"
            src={author.image}
          />
        </figure>
      </div>
      <div className="media-content">
        <p className="has-text-weight-bold">{author.name}</p>
        <p>{comment.content}</p>
        <div className="level">
            <div className="level-left">
              <div className="level-item">
                <span className="created-at mr-2"><span className="has-text-weight-bold">Created on:</span> {commentTimeFormatter(comment.created_at.seconds)}</span>
                <span className="updated-at ml-2"><span className="has-text-weight-bold">Updated on:</span> {commentTimeFormatter(comment.updated_at.seconds)}</span>
              </div>
            </div>
          </div>
      </div>
      {
        currentUser.id === comment.user_id && (
          <button onClick={() => deleteComment(comment.id)} className="delete">X</button>
        )
      }
    </div>
  )
}

CommentReply.propTypes = {
  currentUser: PropTypes.object,
  comment: PropTypes.object,
  deleteComment: PropTypes.func.isRequired,
}

export default connect(null, {deleteComment})(CommentReply);