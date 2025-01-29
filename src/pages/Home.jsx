import React, { useContext, useEffect, useRef } from 'react';

import NowPlayingSectionContainer from '../Containers/NowPlayingSectionContainer';
import GenresContainer from '../Containers/GenresContainer';
import MoviesMainSection from '../Containers/MoviesMainSection';
import NavBar from '../Containers/NavBar';
import SearchWithGenres from '../Components/SearchWithGenres';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';
import useScrollToPosition from '../hooks/useScrollToPosition';

const Home = () => {
  const movieDataContext = useContext(MoviesDataContext);
  const {
    isSearchWithGenresOpen,
    setIsSearchWithGenresOpen,
    homePageScrollPos,
    setHomePageScrollPos,
  } = movieDataContext;

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      const handleScrollPos = (scrollTop) => setHomePageScrollPos(scrollTop);

      scrollableDivRef.current.addEventListener('scroll', (e) => {
        handleScrollPos(e.target.scrollTop);
      });

      return scrollableDivRef.current.removeEventListener('scroll', (e) => {
        handleScrollPos(e.target.scrollTop);
      });
    }
  }, []);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = homePageScrollPos;
    }
  }, []);

  return (
    <section className="min-w-screen max-w-screen min-h-screen max-h-screen overflow-hidden relative select-none">
      <div className="overflow-auto max-h-screen" ref={scrollableDivRef}>
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
