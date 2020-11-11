import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Container from '../layout/Container';

import { connect } from 'react-redux';
import { createSubreddit } from '../../actions/subreddits';

const CreateSubreddit = ({
  createSubreddit,
  auth: { currentUser, isLoggedIn }
}) => {
  const [ input, setInput ] = useState({
    name: '',
    desc: ''
  });
  const { name, desc } = input;

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

    let newSubreddit = {
      ...input,
      user_id
    }

    console.log(newSubreddit);
    setInput({
      name: '',
      desc: ''
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
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Description</label>
            <textarea
              className="textarea"
              type="textarea"
              name="desc"
              value={desc}
              placeholder="Describe the Subreddit"
              onChange={event => handleChange(event)}
            >
            </textarea>
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