import React from 'react';

const GenrePill = ({ genre }) => {
  return (
    <div className="py-4 px-5 border border-transparent text-xs text-slate-100 whitespace-nowrap rounded-xl bg-slate-200 bg-opacity-10 hover:bg-opacity-20 cursor-pointer hover:border-slate-400 transition-all">
      {genre.name}
    </div>
  );
};

export default GenrePill;
