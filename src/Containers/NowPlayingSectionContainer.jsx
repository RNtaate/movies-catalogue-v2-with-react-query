import React, { useContext, useEffect } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useQuery } from '@tanstack/react-query';

import { wait } from '../Helpers/HelperMethods';
import moviesData from '../utils/movies.json';

const moviesList = moviesData.results;

const NowPlayingSectionContainer = () => {
  const moviesDataContext = useContext(MoviesDataContext);
  const { nowPlayingMovies, setNowPlayingMovies } = moviesDataContext;

  const movieListQuery = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: () => {
      return wait(2000).then(() => moviesList);
    },
  });

  useEffect(() => {
    if (movieListQuery.isSuccess) {
      setNowPlayingMovies(movieListQuery.data);
    }
  }, [movieListQuery.isSuccess]);

  if (movieListQuery.isLoading) return <div>Loading ...</div>;
  if (movieListQuery.isError)
    return <div>{JSON.stringify(movieListQuery.error)}</div>;

  return (
    <div>
      {nowPlayingMovies.map((movie) => (
        <span key={movie.id}>{movie.title}</span>
      ))}
    </div>
  );
};

export default NowPlayingSectionContainer;