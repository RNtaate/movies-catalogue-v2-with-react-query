import React from 'react';

const NavBar = () => {
  return (
    <nav className="w-full flex py-4 px-5 justify-between items-center">
      <h1 className="text-3xl font-bold font-robotoflex  p-2 rounded-xl text-slate-300">
        NORP.<span className="text-sm font-light">MOVIES</span>.
      </h1>
      <span className="text-3xl cursor-pointer text-slate-300">
        <i className="fa-brands fa-github"></i>
      </span>
    </nav>
  );
};

export default NavBar;
