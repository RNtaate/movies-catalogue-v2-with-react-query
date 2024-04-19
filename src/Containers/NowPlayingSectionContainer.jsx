import React, { useContext, useEffect, useRef, useState } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useQuery } from '@tanstack/react-query';

import NowPlayingComponent from '../Components/NowPlayingComponent';
import SpinnerLoader from '../Components/loaders/SpinnerLoader';
import LoadingError from '../Components/ErrorComponents/LoadingError';
import { getNowPlayingMovies } from '../Helpers/HelperFetchMethods';

const TRANSLATE_AMOUNT = 200;

const NowPlayingSectionContainer = () => {
  const [translate, setTranslate] = useState(0);
  const [isLeftShowing, setIsLeftShowing] = useState(false);
  const [isRightShowing, setIsRightShowing] = useState(false);
  const containerRef = useRef(null);

  const moviesDataContext = useContext(MoviesDataContext);
  const { nowPlayingMovies, setNowPlayingMovies } = moviesDataContext;

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftShowing(translate > 0);
      setIsRightShowing(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [nowPlayingMovies, translate]);

  //React Query and component functionality code.
  const movieListQuery = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: () => getNowPlayingMovies().then((res) => res),
  });

  useEffect(() => {
    if (movieListQuery.isSuccess) {
      setNowPlayingMovies(movieListQuery.data.data.results);
    }
  }, [movieListQuery.isSuccess]);

  if (movieListQuery.isLoading) {
    return <SpinnerLoader />;
  }

  if (movieListQuery.isError)
    return <LoadingError message={JSON.stringify(movieListQuery.error)} />;

  return (
    <section className="px-5 relative">
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex mb-10 w-max gap-3 transition-transform pt-1"
          style={{ transform: `translateX(-${translate}px)` }}
        >
          {nowPlayingMovies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="w-96 min-w-96 max-w-96 h-auto rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] hover:ring-slate-500 hover:ring-1 hover:cursor-pointer"
              >
                <NowPlayingComponent movie={movie} />
              </div>
            );
          })}
        </div>
      </div>

      {isLeftShowing && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1 text-[80px]">
          <button
            type="button"
            onClick={() => {
              setTranslate((prevTranslate) => {
                const newTranslate = prevTranslate - TRANSLATE_AMOUNT;
                if (newTranslate < 0) return 0;
                return newTranslate;
              });
            }}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>
      )}

      {isRightShowing && (
        <div className="absolute top-1/2 -translate-y-1/2 right-1 text-[80px]">
          <button
            type="button"
            onClick={() => {
              setTranslate((prevTranslate) => {
                const newTranslate = prevTranslate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                console.log(edge, width);
                if (newTranslate + width >= edge) return edge - width;
                return newTranslate;
              });
            }}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      )}
    </section>
  );
};

export default NowPlayingSectionContainer;
