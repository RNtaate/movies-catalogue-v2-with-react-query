import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

import { wait, timeConverter, dateConverter } from '../Helpers/HelperMethods';
import SpinnerLoader from '../Components/loaders/SpinnerLoader';
import NowPlayingCardLoader from '../Components/loaders/NowPlayingCardLoader';
import { getMovieDetails } from '../Helpers/HelperFetchMethods';
import noBackdropPoster from '../assets/no_poster2.png';

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [singleMovie, setSingleMovie] = useState(null);

  useEffect(() => {
    if (!location.state) {
      navigate('/', { replace: true });
    } else {
      setSingleMovie({ ...location.state });
    }
  }, []);

  const movieContext = useContext(MoviesDataContext);
  const { movieDetails, setMovieDetails } = movieContext;
  const [imageLoaded, setImageLoaded] = useState(false);

  const movieDetailsQuery = useQuery({
    queryKey: ['movieDetails'],
    enabled: singleMovie != null,
    queryFn: () => getMovieDetails(singleMovie.id).then((res) => res),
  });

  useEffect(() => {
    if (movieDetailsQuery.isSuccess) {
      console.log('I have reached this place');
      setMovieDetails({ ...movieDetailsQuery.data.data });
    }
  }, [movieDetailsQuery.isSuccess, movieDetailsQuery.data]);

  if (movieDetailsQuery.isLoading || movieDetailsQuery.isFetching)
    return <SpinnerLoader variant="sentry" />;
  if (movieDetailsQuery.isError)
    return (
      <div>
        Something went wrong while fetching movie. Please try again later.
      </div>
    );

  return (
    <>
      {movieDetails != null && (
        <section className="w-screen h-screen overflow-hidden relative">
          <img
            alt="Image backdrop"
            src={
              movieDetails.backdrop_path == null
                ? noBackdropPoster
                : `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
            }
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 flex">
            <div className="w-[50%] flex flex-col justify-center gap-4 px-16 bg-gradient-to-r from-black backdrop-blur-[2px] shadow-[0_0_10px_3px_rgba(0,0,0,0.8)]">
              <h1 className="font-roboto text-6xl font-extrabold">
                {movieDetails.title.toUpperCase()}
              </h1>
              <div className="text-xs font-robotoflex font-extrabold">
                {timeConverter(movieDetails.runtime)}
                <span className="mx-2">&#x2022;</span>
                {dateConverter(movieDetails.release_date).toUpperCase()}
              </div>
              <p className="text-[13px] tracking-wide leading-6 line-clamp-5 font-normal my-3">
                {movieDetails.overview}
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-robotoflex font-extrabold">
                {movieDetails.genres.map((genre) => {
                  return <span>{genre.name.toUpperCase()}</span>;
                })}
                <span>
                  <i className="fa-solid fa-star mr-1 text-orange-500" />
                  {movieDetails.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <NavLink to="/" className="appearance-none">
            <div className="absolute text-3xl top-0 inline-block mx-16 my-3 group">
              <button type="button">
                <i className="fa-solid fa-angles-left group-hover:text-slate-500"></i>
              </button>
            </div>
          </NavLink>
          {!imageLoaded && <NowPlayingCardLoader rounded={false} />}
        </section>
      )}
    </>
  );
};

export default MovieDetails;
