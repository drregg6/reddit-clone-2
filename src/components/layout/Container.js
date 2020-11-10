import React from 'react';

const Container = props => {
  return (
    <div className="container my-5">
      { props.children }
    </div>
  )
}

export default Container;