import React, { useContext, useEffect } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useQuery } from '@tanstack/react-query';

import { wait } from '../Helpers/HelperMethods';
import moviesData from '../utils/movies.json';
import { NavLink } from 'react-router-dom';

const moviesList = moviesData.results;

const MoviesMainSection = () => {
  const moviesDataContext = useContext(MoviesDataContext);
  const { moviesMainList, setMoviesMainList, genresList } = moviesDataContext;

  const movieListQuery = useQuery({
    queryKey: ['movies'],
    enabled: genresList.length != 0,
    queryFn: () => {
      return wait(2000).then(() => moviesList);
    },
  });

  useEffect(() => {
    if (movieListQuery.isSuccess) {
      setMoviesMainList(movieListQuery.data);
    }
  }, [movieListQuery.isSuccess]);

  if (movieListQuery.isLoading) return <div>Loading movies ...</div>;
  if (movieListQuery.isError)
    return <div>{JSON.stringify(movieListQuery.error)}</div>;

  return (
    <div>
      {movieListQuery.isSuccess && <h2>Action & Adventure</h2>}
      {moviesMainList.map((movie) => (
        <NavLink key={movie.id} to={`/movie/${movie.title}`} state={movie}>
          <span>{movie.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default MoviesMainSection;
