import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Posts from './Posts';
import PostForm from './PostForm';

import { connect } from 'react-redux';
import { fetchSubreddit } from '../../actions/subreddits';

const Subreddit = ({
  fetchSubreddit,
  subreddits: { subreddit, isLoading }
}) => {
  let name = useParams();
  useEffect(() => {
    fetchSubreddit(name);
  }, [fetchSubreddit, name]);
  let [showForm, toggleShowForm] = useState(false);
  return (
    <section className="section">
      <button
        className="button is-primary"
        onClick={() => toggleShowForm(!showForm)}
      >
        { showForm ? ('Hide Form') : ('Show Form') }
      </button>
      {
        showForm && <PostForm subreddit={subreddit.id} />
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
      {
        subreddit && <Posts subreddit={subreddit.id} />
      }
    </section>
  )
}

Subreddit.propTypes = {
  fetchSubreddit: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
};

const mapStateToProps = state => ({
  subreddits: state.subreddits
})

export default connect(
  mapStateToProps,
  { fetchSubreddit }
)(Subreddit);