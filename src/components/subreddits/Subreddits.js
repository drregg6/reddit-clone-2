import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getDocById from '../../utils/getDocById';
import { isMobile } from 'react-device-detect';

import Container from '../layout/Container';
import SubCard from './SubCard';
import SubMobileCard from '../mobile/SubMobileCard';

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
                let post = getDocById(posts, sub.id, 'subreddit_id');
                if (post === undefined) {
                  post = {
                    title: 'Nothing here yet!',
                    url: '',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/VisualEditor_-_Icon_-_Link.svg/768px-VisualEditor_-_Icon_-_Link.svg.png',
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
                return isMobile ? (
                  <SubMobileCard
                    key={sub.id}
                    subreddit={sub}
                    post={post}
                  />
                ) : (
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