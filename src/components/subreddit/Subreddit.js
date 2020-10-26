import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchSubreddit } from '../../actions/subreddit';

const Subreddit = ({
  fetchSubreddit,
  subreddit: { subreddit, isLoading }
}) => {
  let name = useParams();
  useEffect(() => {
    fetchSubreddit(name);
  }, [fetchSubreddit, name])
  let render = (isLoading || subreddit === null) ? (
    <h1>Loading...</h1>
  ) : (!isLoading && Object.keys(subreddit).length === 0) ? (
    <h1>This Subreddit does not exist yet</h1>
  ) : (
    <h1>{ subreddit.name }</h1>
  )
  return (
    <div>
      { render }
    </div>
  )
}

Subreddit.propTypes = {
  fetchSubreddit: PropTypes.func.isRequired,
  subreddit: PropTypes.object,
};

const mapStateToProps = state => ({
  subreddit: state.subreddit
})

export default connect(
  mapStateToProps,
  { fetchSubreddit }
)(Subreddit);