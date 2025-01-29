import React, { createContext, useState } from 'react';
import { CURRENT_YEAR } from '../Helpers/HelperConstants';

export const MoviesDataContext = createContext();

const MoviesDataContextProvider = ({ children }) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [moviesMainList, setMoviesMainList] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isSearchWithGenresOpen, setIsSearchWithGenresOpen] = useState(false);
  const [homePageScrollPos, setHomePageScrollPos] = useState(0);

  const finalValues = {
    nowPlayingMovies,
    setNowPlayingMovies,
    genresList,
    setGenresList,
    moviesMainList,
    setMoviesMainList,
    movieDetails,
    setMovieDetails,
    selectedYear,
    setSelectedYear,
    selectedGenre,
    setSelectedGenre,
    isSearchWithGenresOpen,
    setIsSearchWithGenresOpen,
    homePageScrollPos,
    setHomePageScrollPos,
  };

  return (
    <MoviesDataContext.Provider value={finalValues}>
      {children}
    </MoviesDataContext.Provider>
  );
};

export default MoviesDataContextProvider;
