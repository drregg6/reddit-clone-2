import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from '../layout/Container';
import Posts from './Posts';
import PostForm from './PostForm';

import { connect } from 'react-redux';
import { fetchSubreddit } from '../../actions/subreddits';
import {
  deletePost,
  fetchSubredditPosts
} from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import { fetchVotes } from '../../actions/votes';


const Subreddit = ({
  fetchSubredditPosts,
  fetchSubreddit,
  fetchUsers,
  fetchVotes,
  deletePost,
  subreddits: { subreddit, isLoading },
  auth: { currentUser, isLoggedIn },
  users: { users },
  votes: { votes },
  posts: { posts }
}) => {
  let name = useParams();
  useEffect(() => {
    fetchSubreddit(name);
    fetchUsers();
    fetchVotes();
  }, [
    fetchSubreddit,
    fetchUsers,
    fetchVotes,
    name
  ]);
  useEffect(() => {
    if (subreddit !== null) fetchSubredditPosts(subreddit.id)
  }, [fetchSubredditPosts, subreddit])
  
  // Create post form
  let [showForm, toggleShowForm] = useState(false);

  // Search form
  let [search, setSearch] = useState('');
  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <div className="hero is-success is-medium">
        <div className="hero-body">
          <div className="container">
            {
              (isLoading || subreddit === null) ? (
                <h1 className="title">Loading...</h1>
              ) : (!isLoading && Object.keys(subreddit).length === 0) ? (
                <>
                  <h1 className="is-capitalized">
                    This Subreddit does not exist yet
                  </h1>
                  <p className="button is-warning">Create it Here</p>
                </>
              ) : (
                <h1 className=" title is-capitalized">{ subreddit.name }</h1>
              )
            }
          </div>
        </div>
      </div>
      <Container>
        {
          isLoggedIn && (
            <button
              className="button is-primary"
              onClick={() => toggleShowForm(!showForm)}
            >
              { showForm ? ('Hide Form') : ('Add a Post') }
            </button>
          )
        }
        {
          showForm && (
            <PostForm
              toggleShowForm={toggleShowForm}
              subreddit={subreddit.id}
            />
          )
        }
        <form className="form">
          <div className="control">
            <input
              type="text"
              className="input search-box"
              placeholder="Search"
              value={search}
              onChange={event => handleChange(event)}
            />
          </div>
        </form>
        {
          (posts.length !== 0 && subreddit !== null) && (
          <Posts
            users={users}
            votes={votes}
            search={search}
            subreddit={subreddit.name}
            subreddit_id={subreddit.id}
            deletePost={deletePost}
            posts={posts}
            currentUser={currentUser}
          />
        )}
      </Container>
    </div>
  )
}

Subreddit.propTypes = {
  fetchSubredditPosts: PropTypes.func.isRequired,
  fetchSubreddit: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchVotes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
  posts: PropTypes.object,
};

const mapStateToProps = state => ({
  subreddits: state.subreddits,
  posts: state.posts,
  users: state.users,
  votes: state.votes,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    deletePost,
    fetchUsers,
    fetchVotes,
    fetchSubredditPosts,
    fetchSubreddit
  }
)(Subreddit);