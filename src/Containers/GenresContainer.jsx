import React, { useContext, useEffect, useState, useRef } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useQuery } from '@tanstack/react-query';

import genresJsonData from '../utils/genres.json';
import { wait } from '../Helpers/HelperMethods';
import GenrePill from '../Components/GenrePill';

const genres = genresJsonData.genres;
const TRANSLATE_AMOUNT = 200;

const GenresContainer = () => {
  const [isLeftShowing, setIsLeftShowing] = useState(false);
  const [isRightShowing, setIsRightShowing] = useState(false);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef(null);

  const moviesDataContext = useContext(MoviesDataContext);
  const { genresList, setGenresList, nowPlayingMovies } = moviesDataContext;

  //use effect for implementing functionality for the slider.
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
  }, [genresList, translate]);

  //React Query and General Component functionality.
  const genresListQuery = useQuery({
    queryKey: ['genres'],
    enabled: nowPlayingMovies.length != 0,
    queryFn: () => {
      return wait(2000).then(() => [...genres]);
    },
  });

  useEffect(() => {
    if (genresListQuery.isSuccess) {
      setGenresList(genresListQuery.data);
    }
  }, [genresListQuery.isSuccess]);

  if (genresListQuery.isLoading) return <div>Loading Genres...</div>;
  if (genresListQuery.isError)
    return <div>{JSON.stringify(genresListQuery.error)}</div>;

  return (
    <section className="px-5">
      <div ref={containerRef} className="max-w-screen overflow-hidden relative">
        <div
          className="transition-transform whitespace-nowrap flex gap-2 w-[max-content]"
          style={{ transform: `translateX(-${translate}px)` }}
        >
          {genresList.map((genre) => {
            return <GenrePill genre={genre} />;
          })}
        </div>
        {isLeftShowing && (
          <div className="left-angle px-2 absolute h-full aspect-square w-16 md:w-32 top-0 flex items-center bg-gradient-to-r from-slate-900">
            <button
              type="button"
              className="flex justify-center items-center w-8 aspect-square rounded-full hover:ring-slate-500 hover:ring-1"
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
          <div className="left-angle px-2 absolute h-full aspect-square w-16 md:w-32 top-0 right-0 flex items-center justify-end bg-gradient-to-l from-slate-900">
            <button
              type="button"
              className="flex justify-center items-center w-8 aspect-square rounded-full hover:ring-slate-500 hover:ring-1"
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
      </div>
    </section>
  );
};

export default GenresContainer;
