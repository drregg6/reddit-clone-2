import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import MarkedText from '../layout/MarkedText';
import Container from '../layout/Container';

import { connect } from 'react-redux';
import { createSubreddit } from '../../actions/subreddits';

const CreateSubreddit = ({
  createSubreddit,
  auth: { currentUser }
}) => {
  const [ previewMarkdown, togglePreviewMarkdown ] = useState(false);
  const [ input, setInput ] = useState({
    name: '',
    desc: '',
    color: 'red'
  });
  const { name, desc, color } = input;
  let history = useHistory();

  const handleChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = event => {
    event.preventDefault();
    // Get currentUser.id
    let user_id = currentUser.id;
    let name = input.name.toLowerCase();
    name = name.replaceAll(/\W/g, '')


    let newSubreddit = {
      name,
      desc: input.desc,
      user_id,
      color
    }

    createSubreddit(newSubreddit, history);
    setInput({
      name: '',
      desc: '',
      color: ''
    });
  }
  return (
    <Container>
      <h1 className="has-text-centered is-title">Create a Subreddit</h1>
      <form className="create-sub-form" onSubmit={(event) => handleSubmit(event)}>
        <div className="field">
          <div className="control">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              name="name"
              value={name}
              placeholder="Name the Subreddit"
              onChange={event => handleChange(event)}
              maxLength="20"
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
          <label className="label">Description</label>
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
            <label className="label">Color</label>
            <div className="select">
              <select name="color" onChange={event => handleChange(event)}>
                <option value="yellow">Yellow</option>
                <option value="dark">Black</option>
                <option value="light">Light gray</option>
                <option value="lightblue">Light blue</option>
                <option value="darkblue">Dark blue</option>
                <option value="teal">Teal</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>
        </div>
        <div className="control">
          <button className="button is-primary">Create Subreddit</button>
        </div>
      </form>
    </Container>
  )
}

CreateSubreddit.propTypes = {
  auth: PropTypes.object,
  createSubreddit: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    createSubreddit
  }
)(CreateSubreddit);