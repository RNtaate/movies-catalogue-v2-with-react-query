import React, { useContext } from 'react';

import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const movieDataContext = useContext(MoviesDataContext);
  const { isSearchWithGenresOpen, setIsSearchWithGenresOpen } =
    movieDataContext;

  return (
    <nav className="w-full flex flex-col md:flex-row gap-4 py-4 px-5 justify-between md:items-center">
      <NavLink to="/">
        <h1 className="text-3xl font-bold font-robotoflex  p-2 rounded-xl text-slate-300">
          NORP.<span className="text-sm font-light">MOVIES</span>.
        </h1>
      </NavLink>
      <span
        className="inline-block font-robotoflex text-lg cursor-pointer text-slate-300 flex items-center justify-between flex-shrink-0 px-8 py-2 bg-slate-900/[.6] rounded-full hover:ring-1 hover:ring-slate-500 transition-all"
        onClick={() => setIsSearchWithGenresOpen(true)}
      >
        Search
        <i className="fa-solid fa-magnifying-glass ml-4"></i>
      </span>
      <div className="flex gap-3 text-slate-300">
        <NavLink
          to="https://github.com/RNtaate/movies-catalogue-v2-with-react-query"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bg-slate-900/[.6] min-w-12 max-w-12 aspect-square  rounded-full flex justify-center items-center text-2xl hover:ring-slate-500 hover:ring-1 transition-all group cursor-pointer">
            <i className="fa-brands fa-github group-hover:text-slate-500 transition-all"></i>
          </span>
        </NavLink>

        <NavLink
          to="https://linkedin.com/in/roy-ntaate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bg-slate-900/[.6] min-w-12 max-w-12 aspect-square  rounded-full flex justify-center items-center text-2xl hover:ring-slate-500 hover:ring-1 transition-all group cursor-pointer">
            <i className="fa-brands fa-linkedin group-hover:text-slate-500 transition-all"></i>
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
