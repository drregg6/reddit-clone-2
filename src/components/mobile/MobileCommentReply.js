import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import commentTimeFormatter from '../../utils/commentTimeFormatter';

import UpdateCommentForm from '../updateComment/UpdateCommentForm';
import MarkedText from '../layout/MarkedText';

import { connect } from 'react-redux';
import {
  updateComment,
  deleteComment
} from '../../actions/comments';

const MobileCommentReply = ({
  updateComment,
  deleteComment,
  comment,
  currentUser
}) => {
  const [ updateForm, toggleUpdateForm ] = useState(false);
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
          <MarkedText>{comment.content}</MarkedText>
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
          <div className="card-footer" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <button className="button is-warning is-small" style={{ width: '100%' }} onClick={() => toggleUpdateForm(!updateForm)}>Edit</button>
            {
              updateForm && (
                <UpdateCommentForm
                  updateComment={updateComment}
                  oldContent={comment.content}
                  toggleUpdateForm={toggleUpdateForm}
                  comment_id={comment.id}
                />
              )
            }
          </div>
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

MobileCommentReply.propTypes = {
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object,
  currentUser: PropTypes.object,
}

export default connect(
  null,
  {
    updateComment,
    deleteComment
  }
)(MobileCommentReply);