import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchPost } from '../../actions/posts';

const Post = ({
  fetchPost,
  posts: { post }
}) => {
  const { post_id } = useParams();
  useEffect(() => {
    fetchPost(post_id);
  }, [
    fetchPost,
    post_id
  ]);
  return (
    <div>
      <h1>{ post !== null ? post.title : 'Loading...' }</h1>
    </div>
  )
}

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  posts: PropTypes.object,
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(
  mapStateToProps,
  { fetchPost }
)(Post);