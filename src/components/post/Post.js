import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import UpdateForm from './UpdateForm';
import CommentForm from './CommentForm';
import PostComment from './PostComment';

import { connect } from 'react-redux';
import { fetchPost } from '../../actions/posts';
import { fetchSubreddits } from '../../actions/subreddits';
import { fetchComments } from '../../actions/comments';

const Post = ({
  fetchPost,
  fetchSubreddits,
  fetchComments,
  posts: { post },
  auth: { currentUser },
  subreddits: { subreddits },
  comments: { comments }
}) => {
  const { post_id, name } = useParams();
  useEffect(() => {
    fetchPost(post_id);
    fetchSubreddits();
    fetchComments();
  }, [
    fetchSubreddits,
    fetchComments,
    fetchPost,
    post_id
  ]);
  const [ showForm, toggleShowForm ] = useState( false );

  const fetchSubredditByName = (sub_name) => {
    return subreddits.filter(subreddit => subreddit.name === sub_name)[0];
  }
  let subreddit_id = '';
  if (subreddits.length !== 0) {
    subreddit_id = fetchSubredditByName(name).id;
  }

  const getCommentsByPostId = post_id => {
    return comments.filter(comment => comment.post_id === post_id)
  }
  const postComments = getCommentsByPostId(post_id);

  return (
    <section className="section">
      {
        (post !== null && currentUser.id === post.user_id) && (
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
      <div style={{ textAlign: 'center', margin: '2.5rem auto' }}>
        <div className="content is-large">
          <h1 className="is-title">{ post !== null && post.title }</h1>
        </div>
        {
          (post !== null && post.desc !== '') && (
            <div>
              <p>
                {post.desc}
              </p>
            </div>
          )
        }
        {
          (post !== null && post.url !== '') && (
            <div>
              <img src={post.url} alt={post.title} />
            </div>
          )
        }
      </div>
      <div className="comments">
        {
          (postComments.length !== 0) && (
            postComments.map(comment => {
              if (comment.parent_id === null) {
                return (
                  <PostComment
                    comment={comment}
                    comments={comments}
                    currentUser={currentUser}
                  />
                )
              }
            })
          )
        }
        <h2 className="subtitle">Add a Comment</h2>
        <CommentForm
          currentUser={currentUser}
          post_id={post_id}
          name={name}
          subreddit_id={subreddit_id}
        />
      </div>
    </section>
  )
}

Post.propTypes = {
  fetchSubreddits: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
  comments: PropTypes.object,
  posts: PropTypes.object,
}

const mapStateToProps = state => ({
  subreddits: state.subreddits,
  comments: state.comments,
  posts: state.posts,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    fetchPost,
    fetchSubreddits,
    fetchComments
  }
)(Post);