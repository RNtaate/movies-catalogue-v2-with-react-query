import React, { useContext, useEffect, useState } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { useQuery } from '@tanstack/react-query';
import { useKeenSlider } from 'keen-slider/react';

import { wait } from '../Helpers/HelperMethods';
import moviesData from '../utils/movies.json';
import NowPlayingComponent from '../Components/NowPlayingComponent';
import Marquee from 'react-fast-marquee';

const moviesList = moviesData.results;

const NowPlayingSectionContainer = () => {
  // Code for the keen slider dependency.
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 3,
      spacing: 15,
    },
    loop: true,
  });

  //React Query and component functionality code.
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
    <>
      <div className="navigation-wrapper px-5 relative">
        <div ref={sliderRef} className="keen-slider pb-8">
          {nowPlayingMovies.map((movie) => {
            return (
              <div className="keen-slider__slide w-[500px] min-w-[500px] max-w-[500px] rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] hover:ring-slate-500 hover:ring-1 hover:cursor-pointer">
                <NowPlayingComponent movie={movie} />
              </div>
            );
          })}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            />
          </>
        )}
      </div>
    </>
  );
};

export default NowPlayingSectionContainer;

function Arrow(props) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
