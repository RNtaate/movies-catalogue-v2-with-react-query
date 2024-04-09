import React, { useContext } from 'react';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

const GenrePill = ({ genre }) => {
  const movieDataContext = useContext(MoviesDataContext);
  const { selectedGenre, setSelectedGenre } = movieDataContext;

  return (
    <div
      className={`py-4 px-5 border text-xs text-slate-100 whitespace-nowrap rounded-xl bg-slate-200 hover:bg-opacity-20 hover:border-slate-400 cursor-pointer transition-all ${
        selectedGenre.name == genre.name
          ? 'bg-opacity-20 border-slate-400 hover:bg-slate-300'
          : 'bg-opacity-10 border-transparent hover:bg-slate-900'
      }`}
      onClick={() => setSelectedGenre({ ...genre })}
    >
      {genre.name}
    </div>
  );
};

export default GenrePill;
