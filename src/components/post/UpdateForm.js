import React, { useState } from 'react';
import PropTypes from 'prop-types';
import storage from '../../storage';
import getFileName from '../../utils/getFileName';
import isImage from '../../utils/isImage';

import ProgressBar from '../subreddit/ProgressBar';
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
  oldFileRef,
  post_id
}) => {
  const [ input, setInput ] = useState({
    title: oldTitle,
    desc: oldDesc,
    url: oldUrl,
    image: oldImage,
    fileRef: oldFileRef
  });
  let { title, desc, url, image, fileRef } = input;

  const [ previewMarkdown, togglePreviewMarkdown ] = useState(false);
  const [ imageFile, setImageFile ] = useState(null);
  const [ uploadFile, toggleUploadFile ] = useState(false);

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  const fileChange = event => {
    // uploads the file to firebase storage
    let newFile = event.target.files[0];
    
    if (newFile && isImage(newFile.type)) {
      setImageFile(newFile);
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    let newUrl = url;
    let newImage = image;
    let newFileRef = fileRef;
    let imageRef;
    
    if (fileRef !== '') {
      const fileName = getFileName(fileRef);
      const storageRef = storage.ref();
      imageRef = storageRef.child(fileName);
    }

    if (newImage !== '') {
      if (isImage(newImage)) {
        newUrl = '';

        // delete file and fileRef
        newFileRef = '';
        if (fileRef !== '') imageRef.delete();
      } else {
        newUrl = newImage;

        // delete file and fileRef
        newFileRef = '';
        if (fileRef !== '') imageRef.delete();
      }
    }

    if (newUrl !== '') {
      newFileRef = '';
      newImage = '';
      if (fileRef !== '') imageRef.delete();
    }

    if (newFileRef !== '') {
      newImage = '';
      newUrl = '';
    }

    let updatedPost = {
      image: newImage,
      url: newUrl,
      id: post_id,
      title,
      fileRef: newFileRef,
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
            required
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
      <button
        type="button"
        className="button is-small mb-3 is-link"
        onClick={() => toggleUploadFile(!uploadFile)}
      >
        { uploadFile ? 'Add URL' : 'Upload Image' }
      </button>
      {
        uploadFile ? (
          <div className="field">
            <div className="control">
              <input
                disabled={url.length !== 0 || image.length !== 0}
                type="file"
                onChange={event => fileChange(event)}
              />
              <div>
                {
                  imageFile && (
                    <ProgressBar
                      file={imageFile}
                      setImageFile={setImageFile}
                      input={input}
                      setInput={setInput}
                    />
                  )
                }
              </div>
            </div>
            <p className="help">You will <span className="has-text-weight-bold">delete</span> your upload if you add a URL.</p>
          </div>
        ) : (
          <>
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
          </>
        )
      }
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