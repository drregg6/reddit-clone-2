import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MarkedText from '../layout/MarkedText';

const ReplyForm = ({
  currentUser,
  toggleReplyForm,
  subreddit_id,
  comment_id,
  addComment,
  post_id
}) => {
  const [ previewMarkdown, togglePreviewMarkdown ] = useState(false);
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
      <button
        type="button"
        className="button is-info is-small mb-3"
        onClick={() => togglePreviewMarkdown(!previewMarkdown)}
      >
        {previewMarkdown ? 'Hide Preview' : 'Preview Desc'}
      </button>

      <div className="field">
        <div className="control">
          {
            previewMarkdown ? (
              <div className="preview-markdown">
                <MarkedText>{content}</MarkedText>
              </div>
            ) : (
              <textarea
                className="textarea"
                placeholder="Comment"
                type="text"
                value={content}
                name="content"
                onChange={event => handleChange(event)}
              >
              </textarea>
            )
          }
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