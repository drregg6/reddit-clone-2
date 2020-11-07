import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updatePost } from '../../actions/posts';

const UpdateForm = ({
  updatePost,
  oldTitle,
  oldDesc,
  oldUrl,
  post_id
}) => {
  const [ input, setInput ] = useState({
    title: oldTitle,
    desc: oldDesc,
    url: oldUrl
  });
  let { title, desc, url } = input;

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    updatePost(post_id, input);
  }

  return (
    <form className="post-form" onSubmit={event => handleSubmit(event)}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            placeholder="Title"
            type="text"
            value={title}
            name="title"
            onChange={event => handleChange(event)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Desc"
            type="text"
            value={desc}
            name="desc"
            onChange={event => handleChange(event)}
          >
          </textarea>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            placeholder="URL"
            type="text"
            value={url}
            name="url"
            onChange={event => handleChange(event)}
          />
        </div>
      </div>
      <div className="control">
        <button className="button is-primary">Update Post</button>
      </div>
    </form>
  )
}

UpdateForm.propTypes = {
  updatePost: PropTypes.func.isRequired,
  oldTitle: PropTypes.string.isRequired,
  oldDesc: PropTypes.string,
  oldUrl: PropTypes.string,
  post_id: PropTypes.string.isRequired,
}

export default connect(
  null,
  { updatePost }
)(UpdateForm);