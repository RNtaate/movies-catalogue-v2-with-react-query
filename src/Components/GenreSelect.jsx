import React, { useState, useContext, useRef, useEffect } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

import useOutsideClick from '../hooks/useOutsideClick';
import genres from '../utils/genres.json';

// const genresList = genres.genres;

const GenreSelect = ({ disabled = false }) => {
  const movieDataContext = useContext(MoviesDataContext);
  const { genresList, selectedGenre, setSelectedGenre } = movieDataContext;
  // const [selectedGenre, setSelectedGenre] = useState(genresList[0]);

  const [isOpen, setIsOpen] = useState(false);
  const yearRef = useRef(null);

  // Using the custom hook for detecting outside element clicks.
  useOutsideClick(yearRef, () => setIsOpen(false));

  if (genresList.length == 0) return null;

  return (
    <div
      className={`inline-block bg-slate-900/[.6] flex justify-between items-center py-2 w-48 max-w-48 min-w-48 pl-4 pr-3 relative rounded-full text-sm font-robotoflex font-semibold z-10 ${
        disabled ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
      }`}
      onClick={(e) => setIsOpen(!isOpen)}
      ref={yearRef}
    >
      <span>{selectedGenre.name}</span>
      <i
        className={`fa-solid fa-angle-up transition-all ${
          isOpen ? 'rotate-180' : 'rotate-0'
        } `}
      ></i>

      <div
        className={`absolute top-[110%] left-0 w-full bg-slate-900/[.9] shadow-[0_0_10px_3px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="h-56 overflow-auto">
          {genresList.map((genre) => {
            return (
              <li
                key={genre.id}
                value={genre.name}
                className={`hover:bg-slate-600/[.7] transition-all cursor-pointer py-2 pl-4 ${
                  selectedGenre.name == genre.name ? 'bg-slate-500/[.8]' : ''
                }`}
                onClick={(e) => {
                  if (e.target.value != selectedGenre.name) {
                    setSelectedGenre(genre);
                  }
                }}
              >
                {genre.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default GenreSelect;
