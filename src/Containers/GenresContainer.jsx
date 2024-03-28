import React, { useContext } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useQuery } from '@tanstack/react-query';

import genresJsonData from '../utils/genres.json';
import { wait } from '../Helpers/HelperMethods';

const genres = genresJsonData.genres;

const GenresContainer = () => {
  const moviesDataContext = useContext(MoviesDataContext);
  const { genresList, setGenresList, nowPlayingMovies } = moviesDataContext;

  const genresListQuery = useQuery({
    queryKey: ['genres'],
    enabled: nowPlayingMovies.length != 0,
    queryFn: () => {
      return wait(4000).then(() => [...genres]);
    },
  });

  if (genresListQuery.isLoading) return <div>Loading Genres...</div>;
  if (genresListQuery.isError)
    return <div>{JSON.stringify(genresListQuery.error)}</div>;

  if (genresListQuery.isSuccess) {
    setGenresList(genresListQuery.data);
  }

  return (
    <div>
      <h3>GENRES</h3>
      {genresList.map((genre) => (
        <span key={genre.id}>{genre.name}</span>
      ))}
    </div>
  );
};

export default GenresContainer;
