import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import UpdateForm from './UpdateForm';

import { connect } from 'react-redux';
import { fetchPost } from '../../actions/posts';

const Post = ({
  fetchPost,
  posts: { post },
  auth: { user }
}) => {
  const { post_id } = useParams();
  useEffect(() => {
    fetchPost(post_id);
  }, [
    fetchPost,
    post_id
  ]);
  const [ showForm, toggleShowForm ] = useState( false );

  return (
    <div>
      {
        (post !== null && user.id === post.user_id) && (
          <button
            className="button is-success"
            onClick={() => toggleShowForm(!showForm)}
          >Edit Post</button>
        )
      }
      {
        (showForm && post !== null) && (
          <UpdateForm
            oldTitle={post.title}
            oldDesc={post.desc}
            oldUrl={post.url}
            post_id={post.id}
          />
        )
      }
      <h1>{ post !== null ? post.title : 'Loading...' }</h1>
    </div>
  )
}

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  posts: PropTypes.object,
}

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { fetchPost }
)(Post);