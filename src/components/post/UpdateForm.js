import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isImage from '../../utils/isImage';
import MarkedText from '../layout/MarkedText';

import { connect } from 'react-redux';
import { updatePost } from '../../actions/posts';

const UpdateForm = ({
  updatePost,
  toggleShowForm,
  oldTitle,
  oldDesc,
  oldUrl,
  oldImage,
  post_id
}) => {
  const [ previewMarkdown, togglePreviewMarkdown ] = useState(false);
  const [ input, setInput ] = useState({
    title: oldTitle,
    desc: oldDesc,
    url: oldUrl,
    image: oldImage
  });
  let { title, desc, url, image } = input;

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    let newUrl = url;
    let newImage = image;

    if (newImage !== '') {
      if (isImage(newImage)) {
        newUrl = '';
      } else {
        newUrl = newImage;
      }
    }
    if (newUrl !== '') {
      newImage = '';
    }

    let updatedPost = {
      image: newImage,
      url: newUrl,
      id: post_id,
      title,
      desc
    }
    updatePost(post_id, updatedPost);
    toggleShowForm(false);
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
                <MarkedText>{desc}</MarkedText>
              </div>
            ) : (
              <textarea
                className="textarea"
                placeholder="Desc"
                type="text"
                value={desc}
                name="desc"
                onChange={event => handleChange(event)}
              >
              </textarea>
            )
          }
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
            disabled={image.length !== 0}
          />
        </div>
        <p className="help">You may only link to an image <span className="has-text-weight-bold">or</span> a website</p>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            placeholder="Image"
            type="text"
            value={image}
            name="image"
            onChange={event => handleChange(event)}
            disabled={url.length !== 0}
          />
        </div>
        <p className="help">You may only link to an image <span className="has-text-weight-bold">or</span> a website</p>
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
  toggleShowForm: PropTypes.func.isRequired,
  oldDesc: PropTypes.string,
  oldUrl: PropTypes.string,
  oldImage: PropTypes.string,
  post_id: PropTypes.string.isRequired,
}

export default connect(
  null,
  { updatePost }
)(UpdateForm);