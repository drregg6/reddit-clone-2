import { useState, useEffect } from 'react';
import storage from '../storage';

const useStorage = (file) => {
  const [ progress, setProgress ] = useState(0);
  const [ error, setError ] = useState(null);
  const [ url, setUrl ] = useState(null);

  useEffect(() => {
    const storageRef = storage.ref(file.name);

    storageRef.put(file).on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    }, err => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;