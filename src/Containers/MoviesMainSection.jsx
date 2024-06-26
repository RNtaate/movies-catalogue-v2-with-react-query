import React, { useContext, useEffect } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Dots } from 'react-activity';

import { getMoviesList } from '../Helpers/HelperFetchMethods';
import MovieBrick from '../Components/MovieBrick';
import SpinnerLoader from '../Components/loaders/SpinnerLoader';
import LoadingError from '../Components/ErrorComponents/LoadingError';
import YearsSelect from '../Components/YearsSelect';

const MAXIMUM_PAGES = 5;

const MoviesMainSection = () => {
  const moviesDataContext = useContext(MoviesDataContext);
  const {
    moviesMainList,
    setMoviesMainList,
    genresList,
    selectedGenre,
    selectedYear,
  } = moviesDataContext;

  const {
    status,
    error,
    data,
    fetchStatus,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies'],
    enabled: genresList.length != 0,
    getNextPageParam: (prevData) => {
      const nextPageNumber = prevData.data.page + 1;
      const totalPages = prevData.data.total_pages;
      if (nextPageNumber <= MAXIMUM_PAGES && nextPageNumber <= totalPages) {
        return nextPageNumber;
      }
    },
    queryFn: ({ pageParam = 1 }) => {
      return getMoviesList(selectedYear, selectedGenre.id, pageParam).then(
        (res) => res
      );
    },
  });

  useEffect(() => {
    if (status == 'success') {
      setMoviesMainList(data);
    }
  }, [status, data]);

  if ((status == 'loading' || fetchStatus == 'fetching') && !isFetchingNextPage)
    return (
      <div className="flex flex-col justify-center items-center">
        <SpinnerLoader variant="sentry" />
        <h3>Loading Movies...</h3>
      </div>
    );
  if (status == 'error')
    return <LoadingError message={JSON.stringify(error)} />;

  return (
    <section className="flex flex-col px-5">
      {status == 'success' && (
        <div className="py-5 mt-4 font-robotoflex text-md font-bold flex items-center justify-between">
          <h2 className="">{selectedGenre.name}</h2>
          <YearsSelect />
        </div>
      )}
      <section className="flex flex-wrap justify-evenly gap-2 pb-8">
        {moviesMainList != null &&
          moviesMainList.pages
            .flatMap((moviesData) => moviesData.data.results)
            .map((movie) => {
              return <MovieBrick key={movie.id} movie={movie} />;
            })}
      </section>
      {hasNextPage && (
        <div className="flex justify-center items-center py-4">
          <button
            type="button"
            disabled={isFetchingNextPage}
            className={`py-4 px-5 border border-transparent text-xs font-semibold text-slate-100 whitespace-nowrap rounded-xl bg-slate-200 bg-opacity-40 hover:bg-opacity-20 hover:border-slate-400 transition-all ${
              isFetchingNextPage ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? <Dots /> : 'Load More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default MoviesMainSection;
