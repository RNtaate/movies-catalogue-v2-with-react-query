import React from 'react';

const NowPlayingComponent = ({ movie }) => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative hover:ring-1 hover:ring-slate-400 transition-all">
      <img
        alt="movie poster"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t from-black to-[50%] flex flex-col justify-end gap-2 p-3">
        <h2 className="font-medium truncate">{movie.title}</h2>
        <div className="text-[10px] text-white flex items-center">
          <i className="fa-solid fa-circle-play text-slate-500 mr-2 text-sm"></i>
          IN CINEMAS NOW
        </div>
      </div>
    </div>
  );
};

export default NowPlayingComponent;
