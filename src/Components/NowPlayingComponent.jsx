import React from 'react';

const NowPlayingComponent = ({ movie }) => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <img
        alt="movie poster"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default NowPlayingComponent;
