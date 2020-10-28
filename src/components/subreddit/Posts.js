import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts';

const Posts = ({
  subreddit,
  fetchPosts,
  posts: { posts, isLoading }
}) => {
  useEffect(() => {
    fetchPosts(subreddit);
  }, [fetchPosts]);
  return (
    <div>
      <h1>Posts</h1>
      <pre>
        { posts && posts.map(post => post.title) }
      </pre>
    </div>
  )
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts);