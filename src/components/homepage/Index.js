import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Index = ({ login }) => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button className="button is-primary" onClick={() => login()}>Login</button>
    </div>
  )
}

Index.propTypes = {
  login: PropTypes.func.isRequired,
}

export default connect(
  null,
{ login }
)(Index);