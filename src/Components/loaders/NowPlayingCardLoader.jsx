import React from 'react';
import loaderImage from '../../assets/loader-image-1.svg';

const NowPlayingCardLoader = ({ rounded }) => {
  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 bg-slate-500 ${
        rounded ? 'rounded-2xl' : 'rounded-none'
      } overflow-hidden transition-all z-2`}
    >
      <img
        alt="loading image"
        src={loaderImage}
        className="w-full h-full object-fit animate-pulse"
      />
    </div>
  );
};

export default NowPlayingCardLoader;
