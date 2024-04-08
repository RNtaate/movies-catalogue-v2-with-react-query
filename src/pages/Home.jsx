import React, { useContext } from 'react';
import NowPlayingSectionContainer from '../Containers/NowPlayingSectionContainer';
import GenresContainer from '../Containers/GenresContainer';
import MoviesMainSection from '../Containers/MoviesMainSection';
import NavBar from '../Containers/NavBar';
import SearchWithGenres from '../Components/SearchWithGenres';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

const Home = () => {
  const movieDataContext = useContext(MoviesDataContext);
  const { isSearchWithGenresOpen, setIsSearchWithGenresOpen } =
    movieDataContext;

  return (
    <section className="min-w-screen max-w-screen min-h-screen max-h-screen overflow-hidden relative">
      <div className="overflow-auto max-h-screen">
        <NavBar />
        <NowPlayingSectionContainer />
        <GenresContainer />
        <MoviesMainSection />
      </div>
      {isSearchWithGenresOpen && <SearchWithGenres />}
    </section>
  );
};

export default Home;
