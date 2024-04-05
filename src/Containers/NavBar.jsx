import React from 'react';

const NavBar = () => {
  return (
    <nav className="w-full flex flex-col md:flex-row gap-4 py-4 px-5 justify-between md:items-center">
      <h1 className="text-3xl font-bold font-robotoflex  p-2 rounded-xl text-slate-300">
        NORP.<span className="text-sm font-light">MOVIES</span>.
      </h1>
      <span className="inline-block font-robotoflex text-lg cursor-pointer text-slate-300 flex items-center justify-between flex-shrink-0 px-8 py-2 bg-slate-900/[.6] rounded-full hover:ring-1 hover:ring-slate-500 transition-all">
        Search
        <i className="fa-solid fa-magnifying-glass ml-4"></i>
      </span>
      <span className="text-3xl cursor-pointer text-slate-300 hover:text-slate-500 transition-all">
        <i className="fa-brands fa-github"></i>
      </span>
    </nav>
  );
};

export default NavBar;
