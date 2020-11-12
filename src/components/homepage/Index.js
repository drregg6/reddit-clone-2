import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Hero from '../layout/Hero';
import AllPosts from './AllPosts';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { fetchAllPosts } from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import { fetchSubreddits } from '../../actions/subreddits';
import { fetchVotes } from '../../actions/votes';

const Index = ({
  login,
  fetchAllPosts,
  fetchSubreddits,
  fetchVotes,
  fetchUsers,
  posts: { posts },
  auth: { currentUser, isLoggedIn },
  users: { users },
  subreddits: { subreddits },
  votes: { votes }
}) => {
  useEffect(() => {
    fetchAllPosts();
    fetchSubreddits();
    fetchUsers();
    fetchVotes();
  }, [
    fetchAllPosts,
    fetchSubreddits,
    fetchUsers,
    fetchVotes
  ])
  return (
    <section>
      <Hero color="lightblue" large>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Dave Regg's Personal Reddit
            </h1>
            <h2 className="subtitle is-size-6">
              Welcome to the best Reddit clone you'll ever see!
            </h2>
            { !isLoggedIn && <button className="button is-outlined" onClick={() => login()}>Login</button> }
          </div>
        </div>
      </Hero>
      <AllPosts
        posts={posts.slice(0,25)}
        users={users}
        subreddits={subreddits}
        votes={votes}
        currentUser={currentUser}
      />
    </section>
  )
}

Index.propTypes = {
  login: PropTypes.func.isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  fetchVotes: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchSubreddits: PropTypes.func.isRequired,
  posts: PropTypes.object,
  votes: PropTypes.object,
  auth: PropTypes.object,
  subreddits: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  users: state.users,
  subreddits: state.subreddits,
  votes: state.votes
})

export default connect(
  mapStateToProps,
{
  login,
  fetchVotes,
  fetchAllPosts,
  fetchSubreddits,
  fetchUsers,
}
)(Index);