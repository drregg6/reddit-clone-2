import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';

import { connect } from 'react-redux';
import {
  fetchPosts,
  deletePost,
  upvote,
  downvote
} from '../../actions/posts';

const Posts = ({
  search,
  subreddit,
  fetchPosts,
  deletePost,
  upvote,
  downvote,
  posts: { posts, isLoading },
  auth: { user }
}) => {
  useEffect(() => {
    fetchPosts(subreddit);
  }, [fetchPosts, subreddit]);

  const filterPosts = posts => {
    if (search !== '') {
      const regex = new RegExp(search, 'gi');
      return posts.filter(post => {
        return (post.title + post.desc).match(regex)
      });
    }
    return posts;
  }
  return (
    <section>
      <div className="columns is-multiline is-4 posts">
        {
          (posts && !isLoading) ? (
            filterPosts(posts).map(post => {
              return (
                <div className="column is-4 post-column" key={post.id}>
                  {
                    post.user_id === user.id && (
                    <button
                      className="button is-danger delete-button"
                      onClick={() => (deletePost(post.id))}
                    >
                      X
                    </button>
                  )}
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img src={ post.url !== '' ? post.url : 'http://www.placehold.it/250x250' } alt="Post image" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                          </figure>
                        </div>
                        <div className="media-content">
                          {
                            post.url !== '' ? (
                              <p className="title is-4"><a href={`${ post.url }`} target="_blank">{ post.title }</a></p>
                            ) : (
                              <p className="title is-4">{ post.title }</p>
                            )
                          }
                          <p className="subtitle is-6">{ post.user }</p>
                        </div>
                      </div>

                      <div className="content">
                        { post.desc && post.desc }
                        <br />
                        <time>{ post.updated_at && dateFormatter(post.updated_at.seconds) }</time>
                      </div>
                      <div className="votes" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                          className="button is-success"
                          onClick={() => upvote(post.user_id, post.id)}
                        >
                          Upvote
                        </button>
                        <span className="vote-amount" style={{ margin: '0 1rem' }}>0</span>
                        <button
                          className="button is-danger"
                          onClick={() => downvote(post.user_id, post.id)}
                        >
                          Downvote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <h1>Loading</h1>
          )
        }
      </div>
    </section>
  )
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  search: PropTypes.string,
  subreddit: PropTypes.string,
}

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    fetchPosts,
    deletePost,
    upvote,
    downvote
  }
)(Posts);