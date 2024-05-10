import React, { useEffect } from 'react';

// A custom hook to help determine any click event that happened outside of a particular element.
const useOutsideClick = (ref, fn) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [ref]);
};

export default useOutsideClick;
