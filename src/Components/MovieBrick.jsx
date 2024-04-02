import React from 'react';

const MovieBrick = ({ movie }) => {
  return (
    <div className="group max-w-44 min-w-44 hover:cursor-pointer transition-all">
      <div className="group-hover:ring-slate-400 group-hover:ring-1 w-full apsect-[1/2] overflow-hidden rounded-3xl transition-all">
        <img
          alt="movie poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="py-2 space-y-1 group-hover:text-slate-900 transition-all">
        <h3 className="text-xs font-medium truncate">{movie.title}</h3>
        <h4 className="text-[10px] font-light">
          <i className="fa-solid fa-star mr-1 text-orange-500"></i>
          {movie.vote_average.toFixed(1)} | {movie.release_date.split('-')[0]}
        </h4>
      </div>
    </div>
  );
};

export default MovieBrick;
