import React, { useContext, useEffect } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useQuery } from '@tanstack/react-query';

import { wait } from '../Helpers/HelperMethods';
import moviesData from '../utils/movies.json';
import { NavLink } from 'react-router-dom';
import MovieBrick from '../Components/MovieBrick';
import SpinnerLoader from '../Components/loaders/SpinnerLoader';
import LoadingError from '../Components/ErrorComponents/LoadingError';

const moviesList = moviesData.results;

const MoviesMainSection = () => {
  const moviesDataContext = useContext(MoviesDataContext);
  const { moviesMainList, setMoviesMainList, genresList } = moviesDataContext;

  const movieListQuery = useQuery({
    queryKey: ['movies'],
    enabled: genresList.length != 0,
    queryFn: () => {
      return wait(4000).then(() => moviesList);
    },
  });

  useEffect(() => {
    if (movieListQuery.isSuccess) {
      setMoviesMainList(movieListQuery.data);
    }
  }, [movieListQuery.isSuccess]);

  if (movieListQuery.isLoading) return <SpinnerLoader variant="sentry" />;
  if (movieListQuery.isError)
    return <LoadingError message={JSON.stringify(movieListQuery.error)} />;

  return (
    <section className="flex flex-col px-5">
      {movieListQuery.isSuccess && (
        <div className="py-5 mt-4">
          <h2 className="font-robotoflex text-xl">Action & Adventure</h2>
        </div>
      )}
      <section className="flex flex-wrap justify-evenly gap-2 pb-8">
        {moviesMainList.map((movie) => {
          return <MovieBrick key={movie.id} movie={movie} />;
        })}
      </section>
    </section>
  );
};

export default MoviesMainSection;
