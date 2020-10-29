import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';
// import getUserById from '../../utils/getUserById';

import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts';

const Posts = ({
  search,
  subreddit,
  fetchPosts,
  posts: { posts, isLoading }
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
    <div>
      <h1>Posts</h1>
      <div className="columns is-multiline is-4 posts">
        {
          (posts && !isLoading) ? (
            filterPosts(posts).map(post => {
              return (
                <div className="column is-4" key={post.id}>
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
  search: PropTypes.string,
  subreddit: PropTypes.string,
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts);