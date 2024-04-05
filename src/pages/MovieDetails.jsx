import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

import singleMovieData from '../utils/SingleMovie.json';
import { wait, timeConverter, dateConverter } from '../Helpers/HelperMethods';

const MovieDetails = () => {
  // const location = useLocation();
  // console.log(location);
  // const navigate = useNavigate();

  // const [singleMovie, setSingleMovie] = useState(null);

  // useEffect(() => {
  //   if (!location.state) {
  //     navigate('/', { replace: true });
  //   } else {
  //     setSingleMovie({ ...location.state });
  //   }
  // }, []);

  const movieContext = useContext(MoviesDataContext);
  const { movieDetails, setMovieDetails } = movieContext;

  const movieDetailsQuery = useQuery({
    queryKey: ['movieDetails'],
    queryFn: () =>
      wait(2000).then(() => {
        return { ...singleMovieData };
      }),
  });

  useEffect(() => {
    if (movieDetailsQuery.isSuccess) {
      console.log(movieDetailsQuery.data);
      setMovieDetails({ ...movieDetailsQuery.data });
    }
  }, [movieDetailsQuery.isSuccess]);

  if (movieDetailsQuery.isLoading) return <div>Loading Movie...</div>;
  if (movieDetailsQuery.isError)
    return (
      <div>
        Something went wrong while fetching movie. Please try again later.
      </div>
    );

  return (
    <>
      {movieDetails != null && (
        <section
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
          }}
          className="w-screen h-screen overflow-hidden bg-center bg-no-repeat bg-cover relative"
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 flex">
            <div className="w-[50%] flex flex-col justify-center gap-4 px-16 bg-gradient-to-r from-black/[.9] backdrop-blur-[1px] shadow-[0_0_10px_3px_rgba(0,0,0,0.8)]">
              <h1 className="font-roboto text-6xl font-extrabold">
                {movieDetails.title.toUpperCase()}
              </h1>
              <div className="text-xs font-robotoflex font-extrabold">
                {timeConverter(movieDetails.runtime)}
                <span className="mx-2">&#x2022;</span>
                {dateConverter(movieDetails.release_date).toUpperCase()}
              </div>
              <p className="text-sm tracking-wide leading-6 line-clamp-5 font-light my-3">
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
        </section>
      )}
    </>
  );
};

export default MovieDetails;
