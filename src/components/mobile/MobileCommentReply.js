import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import commentTimeFormatter from '../../utils/commentTimeFormatter';

const MobileCommentReply = ({
  deleteComment,
  comment,
  currentUser
}) => {
  let author = {
    id: 'st1llw0rk1ng',
    name: 'Anonymous',
    image: 'https://bulma.io/images/placeholders/96x96.png'
  }
  if (comment.author !== undefined) {
    author.name = comment.author.name;
    author.image = comment.author.image;
  }
  return (
    <div className="card mobile-card" style={{ width: '92%' }}>
      <div className="card-header">
        <span className="card-header-title">
          <figure className="mb-0 mr-3 image is-24x24">
            <img
              alt=""
              className="is-rounded"
              src={author.image}
            />
          </figure>
          <Link to={`/u/${author.id}`}>{author.name}</Link>
        </span>
      </div>
      <div className="card-content">
        <div className="content">
          {comment.content}
          <p className="is-size-7 mt-3 mb-0">
            <span className="is-italic">Created</span> {commentTimeFormatter(comment.created_at.seconds)}
          </p>
          <p className="is-size-7 mt-0 mb-0">
            <span className="is-italic">Updated</span> {commentTimeFormatter(comment.updated_at.seconds)}
          </p>
        </div>
      </div>
      {
        currentUser.id === comment.user_id && (
          <button className="delete-button" onClick={() => deleteComment(comment.id)}>X</button>
        )
      }
    </div>
  )
}

MobileCommentReply.propTypes = {
  deleteComment: PropTypes.func,
  comment: PropTypes.object,
  currentUser: PropTypes.object,
}

export default MobileCommentReply;