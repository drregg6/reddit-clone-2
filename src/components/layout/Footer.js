import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  login,
  logout
} from '../../actions/auth';

const Footer = ({
  auth: { isLoggedIn, currentUser }
}) => {
  return (
    <footer className="footer">
      <div className="columns">
        <div className="column">
          <nav className="nav">
            <div className="navbar-item">
              <Link to='/'>Home</Link>
            </div>
            <div className="navbar-item">
              <Link to='/r/index'>Subreddits</Link>
            </div>
            {
              isLoggedIn && (
                <div className="navbar-item">
                  <Link to='/create-a-subreddit'>Create a Subreddit</Link>
                </div>
              )
            }
          </nav>
        </div>
        <div className="column mid-column has-text-centered">
          <p>
            &copy;{new Date().getFullYear()} <a href="http://www.daveregg.com" rel="noopener noreferrer" target="_blank">Dave Regg</a>
          </p>
        </div>
        <div className="column">
          {
            isLoggedIn ? (
              <nav className="nav">
                <div className="navbar-item">
                  <Link to={`/u/${currentUser.id}`} className="button is-light is-info mb-1">{currentUser.name}</Link>
                </div>
                <div className="navbar-item">
                  <button className="button is-danger mt-1" onClick={() => logout()}>Logout</button>
                </div>
              </nav>
            ) : (
              <button className="button is-info" onClick={() => login()}>Login with Google</button>
            )
          }
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(Footer);