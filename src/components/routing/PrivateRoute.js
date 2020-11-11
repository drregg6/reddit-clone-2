import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'

// Not quite working with Firestore
// If a user types in the address, isLoggedIn doesn't trigger that quickly
// The user is not popped into the database quick enough
const PrivateRoute = ({
  component: Component,
  auth: { isLoggedIn, isLoading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => (!isLoggedIn && isLoading) ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);