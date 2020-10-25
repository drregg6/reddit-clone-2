import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import Subreddits from './Subreddits';

const Index = ({
  login,
  auth: { isLoggedIn }
}) => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      {
        isLoggedIn ? (
          <Subreddits />
        ) : (
          <button className="button is-primary" onClick={() => login()}>Login</button>
        )
      }
    </div>
  )
}

Index.propTypes = {
  login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
{ login }
)(Index);