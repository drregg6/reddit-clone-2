import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from '../layout/Container';
import SubCard from './SubCard';

import { connect } from 'react-redux';
import { fetchSubreddits } from '../../actions/subreddits';
import { fetchAllPosts } from '../../actions/posts';

const Subreddits = ({
  fetchSubreddits,
  fetchAllPosts,
  posts: { posts },
  subreddits: { subreddits }
}) => {
  useEffect(() => {
    fetchSubreddits();
    fetchAllPosts();
  }, [
    fetchSubreddits,
    fetchAllPosts
  ]);
  const findFirstPostOfSub = subreddit_id => {
    return posts.filter(post => post.subreddit_id === subreddit_id)[0];
  }
  return (
    <section>
      <div className="hero is-warning is-medium">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Subreddits
            </h1>
            <h2>
              See the latest from each Subreddit
            </h2>
          </div>
        </div>
      </div>
      <Container>
        <div className="columns is-multiline is-4">
          {
            subreddits.length !== 0 && (
              subreddits.map(sub => {
                let post = findFirstPostOfSub(sub.id);
                if (post === undefined) {
                  post = {
                    title: 'Nothing here yet!',
                    url: 'https://bulma.io/images/placeholders/96x96.png',
                    user_id: 'none',
                    subreddit_id: sub.id,
                    id: 'none',
                    desc: 'Be the first to post in this subreddit!',
                    created_at: {
                      seconds: 0,
                      nanoseconds: 0
                    },
                    updated_at: {
                      seconds: 0,
                      nanoseconds: 0
                    }
                  };
                }
                return (
                  <SubCard
                    key={sub.id}
                    subreddit={sub}
                    post={post}
                  />
                )
              })
            )
          }
        </div>
      </Container>
    </section>
  )
}

Subreddits.propTypes = {
  fetchSubreddits: PropTypes.func.isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
  posts: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    subreddits: state.subreddits,
    posts: state.posts
  }
}

export default connect(
  mapStateToProps,
  {
    fetchSubreddits,
    fetchAllPosts
  }
)(Subreddits);