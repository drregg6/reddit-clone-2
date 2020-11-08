import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({
  currentUser,
  subreddit_id,
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
      parent_id: null
    }
    console.log(newComment);
  }
  return (
    <form className="post-form" onSubmit={event => handleSubmit(event)}>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Comment"
            type="text"
            value={content}
            name="content"
            onChange={event => handleChange(event)}
          >
          </textarea>
        </div>
      </div>
      <div className="control">
        <button className="button is-primary">Comment</button>
      </div>
    </form>
  )
}

CommentForm.propTypes = {
  currentUser: PropTypes.object,
  post_id: PropTypes.string,
  subreddit_id: PropTypes.string,
}

export default CommentForm;