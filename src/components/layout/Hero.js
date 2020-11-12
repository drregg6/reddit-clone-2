import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({
  large,
  medium,
  color,
  children
}) => {
  return (
    <div
      className={`hero
        ${color === 'yellow' && 'is-warning'}
        ${color === 'green' && 'is-success'}
        ${color === 'lightblue' && 'is-info'}
        ${color === 'darkblue' && 'is-link'}
        ${color === 'light' && 'is-light'}
        ${color === 'dark' && 'is-dark'}
        ${color === 'teal' && 'is-primary'}
        ${large && 'is-large'}
        ${medium && 'is-medium'}
      `}
    >
      { children }
    </div>
  )
}

Hero.propTypes = {
  color: PropTypes.string,
  large: PropTypes.bool,
  medium: PropTypes.bool,
}

export default Hero;