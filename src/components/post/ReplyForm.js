import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ReplyForm = ({
  currentUser,
  toggleReplyForm,
  subreddit_id,
  comment_id,
  addComment,
  post_id
}) => {
  const [ input, setInput ] = useState({
    content: ''
  });
  const { content } = input;

  const handleChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    let user_id = currentUser.id;
    let newComment = {
      ...input,
      user_id,
      post_id,
      subreddit_id,
      parent_id: comment_id
    }
    addComment(newComment);
    setInput({ content: '' });
    toggleReplyForm(false);
  }
  return (
    <form className="post-form" onSubmit={event => handleSubmit(event)}>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Reply"
            type="text"
            value={content}
            name="content"
            onChange={event => handleChange(event)}
          >
          </textarea>
        </div>
      </div>
      <div className="control">
        <button className="button is-primary is-small">Comment</button>
      </div>
    </form>
  )
}

ReplyForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  toggleReplyForm: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  post_id: PropTypes.string,
  comment_id: PropTypes.string,
  subreddit_id: PropTypes.string,
}

export default ReplyForm;