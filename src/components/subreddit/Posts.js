import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';

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
      <div className="columns is-multiline is-4 posts">
        {
          (posts && !isLoading) ? (
            posts.map(post => {
              console.log(post.updated_at);
              return (
                <div className="column is-4">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={ post.url !== '' ? post.url : 'http://www.placehold.it/250x250' } alt="Placeholder image" />
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
                          <p className="title is-4">John Smith</p>
                          <p className="subtitle is-6">@johnsmith</p>
                        </div>
                      </div>

                      <div className="content">
                        { post.desc && post.desc }
                        <br />
                        <time>{ post.updated_at && dateFormatter(post.updated_at.seconds) }</time>
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