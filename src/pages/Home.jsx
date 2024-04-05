import React from 'react';
import NowPlayingSectionContainer from '../Containers/NowPlayingSectionContainer';
import GenresContainer from '../Containers/GenresContainer';
import MoviesMainSection from '../Containers/MoviesMainSection';
import NavBar from '../Containers/NavBar';

const Home = () => {
  return (
    <>
      <NavBar />
      <NowPlayingSectionContainer />
      <GenresContainer />
      <MoviesMainSection />
    </>
  );
};

export default Home;
