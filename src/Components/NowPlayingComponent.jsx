import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import NowPlayingCardLoader from './loaders/NowPlayingCardLoader';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

const NowPlayingComponent = ({ movie }) => {
  const movieDataContext = useContext(MoviesDataContext);
  const { movieDetails } = movieDataContext;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const queryClient = useQueryClient();
  return (
    <NavLink
      to={`/movie/${movie.title}`}
      state={movie}
      className="appearance-none"
    >
      <div
        className="w-full h-full rounded-2xl overflow-hidden relative hover:ring-1 hover:ring-slate-400 transition-all relative"
        onClick={() => {
          if (movieDetails.title != movie.title) {
            queryClient.invalidateQueries(['movieDetails']);
          }
        }}
      >
        <img
          alt="movie poster"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-full object-cover"
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t from-black to-[50%] flex flex-col justify-end gap-2 p-3">
          <h2 className="font-medium truncate">{movie.title}</h2>
          <div className="text-[10px] text-white flex items-center">
            <i className="fa-solid fa-circle-play text-green-500 mr-2 text-sm"></i>
            IN CINEMAS NOW
          </div>
        </div>
        {!isImageLoaded && <NowPlayingCardLoader />}
      </div>
    </NavLink>
  );
};

export default NowPlayingComponent;
