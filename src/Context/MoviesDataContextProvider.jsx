import React, { createContext, useState } from 'react';

export const MoviesDataContext = createContext();

const MoviesDataContextProvider = ({ children }) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [moviesMainList, setMoviesMainList] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  const finalValues = {
    nowPlayingMovies,
    setNowPlayingMovies,
    genresList,
    setGenresList,
    moviesMainList,
    setMoviesMainList,
    movieDetails,
    setMovieDetails,
  };

  return (
    <MoviesDataContext.Provider value={finalValues}>
      {children}
    </MoviesDataContext.Provider>
  );
};

export default MoviesDataContextProvider;
