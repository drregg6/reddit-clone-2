import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Posts from './Posts';
import PostForm from './PostForm';

import { connect } from 'react-redux';
import { fetchSubreddit } from '../../actions/subreddits';

const Subreddit = ({
  fetchSubreddit,
  subreddits: { subreddit, isLoading },
  auth: { isLoggedIn }
}) => {
  let name = useParams();
  useEffect(() => {
    fetchSubreddit(name);
  }, [fetchSubreddit, name]);
  let [showForm, toggleShowForm] = useState(false);
  let [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  }
  return (
    <section className="section">
      {
        isLoggedIn && (
          <button
            className="button is-primary"
            onClick={() => toggleShowForm(!showForm)}
          >
            { showForm ? ('Hide Form') : ('Show Form') }
          </button>
        )
      }
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
      <form className="form">
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder="Search"
            value={search}
            onChange={event => handleChange(event)}
          />
        </div>
      </form>
      {
        subreddit && (
        <Posts
          search={search}
          subreddit={subreddit.id}
        />
      )}
    </section>
  )
}

Subreddit.propTypes = {
  fetchSubreddit: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
};

const mapStateToProps = state => ({
  subreddits: state.subreddits,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { fetchSubreddit }
)(Subreddit);