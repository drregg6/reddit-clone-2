import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createPost } from '../../actions/posts';

const PostForm = ({
  createPost,
  subreddit
}) => {
  const [input, setInput] = useState({
    title: '',
    desc: '',
    url: ''
  });
  const { title, desc, url } = input;

  const handleChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    let newPost = {
      ...input,
      subreddit_id: subreddit
    }
    
    createPost(newPost);
    setInput({
      title: '',
      desc: '',
      url: ''
    });
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
        <button className="button is-primary">Create Post</button>
      </div>
    </form>
  )
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  subreddit: PropTypes.string.isRequired
}

// will need to know if user is authorized
export default connect(
  null,
  { createPost }
)(PostForm);