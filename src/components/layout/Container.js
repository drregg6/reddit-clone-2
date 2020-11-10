import React from 'react';

const Container = props => {
  return (
    <div className="container section my-5">
      { props.children }
    </div>
  )
}

export default Container;