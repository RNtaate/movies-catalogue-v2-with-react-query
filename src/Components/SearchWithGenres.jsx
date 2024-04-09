import React, { useContext, useState } from 'react';
import YearsSelect from './YearsSelect';
import GenreSelect from './GenreSelect';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

const SearchWithGenres = () => {
  const movieDataContext = useContext(MoviesDataContext);
  const {
    setIsSearchWithGenresOpen,
    selectedGenre,
    setSelectedGenre,
    setSelectedYear,
    moviesMainList,
  } = movieDataContext;
  const [localGenre, setLocalGenre] = useState({ ...selectedGenre });

  return (
    <section className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-start py-10 bg-slate-900/[0.9]">
      <div className="wrapper flex flex-col gap-5 items-center bg-slate-500 w-full md:w-[70%] py-10 rounded-3xl px-2 shadow-[0_0_10px_3px_rgba(0,0,0,0.4)] relative">
        <h4 className="font-robotoflex text-2xl font-bold tracking-widest text-center">
          SEARCH MOVIES BY YEAR AND GENRE
        </h4>
        <div className="flex flex-col md:flex-row gap-5">
          <GenreSelect setLocalGenre={setLocalGenre} localGenre={localGenre} />
          <YearsSelect />
          <button
            type="button"
            className="inline-block px-5 rounded-full bg-slate-900/[.6]"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <button
          type="button"
          className="absolute right-5 top-2 text-xl hover:text-slate-900 transition-all"
          onClick={() => {
            let currentMovie = moviesMainList[0];
            let currentYear = new Date(currentMovie.release_date).getFullYear();
            setSelectedYear(currentYear);
            setIsSearchWithGenresOpen(false);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </section>
  );
};

export default SearchWithGenres;
