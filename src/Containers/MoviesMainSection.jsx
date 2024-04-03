import React, { useContext, useEffect } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useQuery } from '@tanstack/react-query';

import { wait } from '../Helpers/HelperMethods';
import moviesData from '../utils/movies.json';
import { NavLink } from 'react-router-dom';
import MovieBrick from '../Components/MovieBrick';

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
