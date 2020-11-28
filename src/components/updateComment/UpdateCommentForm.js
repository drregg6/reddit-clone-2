import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MarkedText from '../layout/MarkedText';

const UpdateCommentForm = ({
  comment_id,
  oldContent,
  updateComment,
  toggleUpdateForm,
}) => {
  const [ previewMarkdown, togglePreviewMarkdown ] = useState(false);
  const [ input, setInput ] = useState({
    content: oldContent
  });
  const { content } = input;

  const handleChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = event => {
    event.preventDefault();
    let updatedComment = {
      content,
      id: comment_id
    }
    updateComment(updatedComment);
    toggleUpdateForm(false);
  }
  return (
    <form className="post-form" onSubmit={(event) => handleSubmit(event)}>
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
        <button className="button is-primary is-small">Update</button>
      </div>
    </form>
  )
}

UpdateCommentForm.propTypes = {
  comment_id: PropTypes.string,
  oldContent: PropTypes.string,
  toggleUpdateForm: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
}

export default UpdateCommentForm;