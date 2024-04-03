import React from 'react';

const LoadingError = ({ message }) => {
  return (
    <div className="flex justify-center items-center p-5">
      <h4 className="text-xl text-slate-200 font-light">{message}</h4>
    </div>
  );
};

export default LoadingError;
