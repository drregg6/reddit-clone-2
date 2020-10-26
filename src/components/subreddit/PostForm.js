import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PostForm = props => {
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
    console.log(input);
    setInput({
      title: '',
      desc: '',
      url: ''
    });
  }

  return (
    <form onSubmit={event => handleSubmit(event)}>
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

}

export default PostForm;