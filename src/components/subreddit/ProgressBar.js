import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import PropTypes from 'prop-types';

const ProgressBar = ({
  file,
  input,
  setInput,
  setImageFile
}) => {
  const { url, progress } = useStorage(file);
  useEffect(() => {
    if (url) {
      setInput({
        ...input,
        fileRef: url
      });
      setImageFile(null);
    }
  }, [
    url,
    input,
    setInput,
    setImageFile
  ]);
  return (
    <div style={{
      width: progress + '%',
      height: '7px',
      backgroundColor: 'pink'
    }}></div>
  )
}

ProgressBar.propTypes = {
  file: PropTypes.object,
  input: PropTypes.object,
  setInput: PropTypes.func.isRequired,
  setImageFile: PropTypes.func.isRequired,
}

export default ProgressBar;
