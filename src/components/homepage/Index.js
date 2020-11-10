import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import AllPosts from './AllPosts';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { fetchAllPosts } from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import { fetchSubreddits } from '../../actions/subreddits';

const Index = ({
  login,
  fetchAllPosts,
  fetchSubreddits,
  fetchUsers,
  posts: { posts },
  auth: { isLoggedIn },
  users: { users },
  subreddits: { subreddits }
}) => {
  useEffect(() => {
    fetchAllPosts();
    fetchSubreddits();
    fetchUsers();
  }, [
    fetchAllPosts,
    fetchSubreddits,
    fetchUsers
  ])
  return (
    <section>
      <div class="hero is-info is-large">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              One Kick Ass Site
            </h1>
            <h2 class="subtitle is-size-6">
              Welcome to the best Reddit clone you'll ever see!
            </h2>
            { !isLoggedIn && <button className="button is-outlined" onClick={() => login()}>Login</button> }
          </div>
        </div>
      </div>
      <AllPosts
        posts={posts.slice(0,25)}
        users={users}
        subreddits={subreddits}
      />
    </section>
  )
}

Index.propTypes = {
  login: PropTypes.func.isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  posts: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  users: state.users,
  subreddits: state.subreddits
})

export default connect(
  mapStateToProps,
{
  login,
  fetchAllPosts,
  fetchSubreddits,
  fetchUsers,
}
)(Index);