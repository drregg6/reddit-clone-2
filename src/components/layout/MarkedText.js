import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';

const MarkedText = ({
  children
}) => {
  const getMarkdownText = () => {
    let rawMarkup = DOMPurify.sanitize(marked(children));
    return { __html: rawMarkup };
  }
  return (
    <div dangerouslySetInnerHTML={getMarkdownText()}></div>
  )
}

export default MarkedText;