import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import NoPoster from '../assets/no_poster1.jpeg';
import MovieBrickLoader from './loaders/MovieBrickLoader';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

const MovieBrick = ({ movie }) => {
  const movieDataContext = useContext(MoviesDataContext);
  const { movieDetails } = movieDataContext;
  const queryClient = useQueryClient();

  const [imageLoaded, setImageLoaded] = useState(false);
  const posterPath =
    movie.poster_path == null
      ? NoPoster
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <NavLink
      to={`/movie/${movie.title}`}
      state={movie}
      className="appearance-none"
    >
      <div
        className="group max-w-44 min-w-44 hover:cursor-pointer transition-all"
        onClick={() => {
          if (movieDetails != null && movieDetails.title != movie.title) {
            queryClient.invalidateQueries(['movieDetails']);
          }
        }}
      >
        <div className="group-hover:ring-slate-400 group-hover:ring-1 w-full h-[17rem] overflow-hidden rounded-3xl transition-all relative">
          <img
            alt="movie poster"
            src={posterPath}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <MovieBrickLoader />}
        </div>
        <div className="py-2 space-y-1 group-hover:text-slate-900 transition-all">
          <h3 className="text-xs font-medium truncate">{movie.title}</h3>
          <h4 className="text-[10px] font-light">
            <i className="fa-solid fa-star mr-1 text-orange-500"></i>
            {movie.vote_average.toFixed(1)} | {movie.release_date.split('-')[0]}
          </h4>
        </div>
      </div>
    </NavLink>
  );
};

export default MovieBrick;
