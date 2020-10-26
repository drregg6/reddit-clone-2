import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import PostForm from './PostForm';

import { connect } from 'react-redux';
import { fetchSubreddit } from '../../actions/subreddit';

const Subreddit = ({
  fetchSubreddit,
  subreddit: { subreddit, isLoading }
}) => {
  let name = useParams();
  useEffect(() => {
    fetchSubreddit(name);
  }, [fetchSubreddit, name]);
  let [showForm, toggleShowForm] = useState(false);
  return (
    <div>
      <button
        className="button is-primary"
        onClick={() => toggleShowForm(!showForm)}
      >
        { showForm ? ('Hide Form') : ('Show Form') }
      </button>
      {
        showForm && <PostForm />
      }
      {
        (isLoading || subreddit === null) ? (
          <h1>Loading...</h1>
        ) : (!isLoading && Object.keys(subreddit).length === 0) ? (
          <h1>This Subreddit does not exist yet</h1>
        ) : (
          <h1>{ subreddit.name }</h1>
        )
      }
    </div>
  )
}

Subreddit.propTypes = {
  fetchSubreddit: PropTypes.func.isRequired,
  subreddit: PropTypes.object,
};

const mapStateToProps = state => ({
  subreddit: state.subreddit
})

export default connect(
  mapStateToProps,
  { fetchSubreddit }
)(Subreddit);