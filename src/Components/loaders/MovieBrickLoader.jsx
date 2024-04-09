import React from 'react';
import loaderImage from '../../assets/loader-image-1.svg';

const MovieBrickLoader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-500 rounded-2xl overflow-hidden transition-all z-2 flex flex-col gap-3">
      <img
        alt="loading image"
        src={loaderImage}
        className="w-full h-full object-fit animate-pulse"
      />
    </div>
  );
};

export default MovieBrickLoader;
