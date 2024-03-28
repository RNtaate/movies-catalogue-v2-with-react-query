import React from 'react';
import NowPlayingSectionContainer from '../Containers/NowPlayingSectionContainer';
import GenresContainer from '../Containers/GenresContainer';
import MoviesMainSection from '../Containers/MoviesMainSection';

const Home = () => {
  return (
    <>
      <NowPlayingSectionContainer />
      <GenresContainer />
      <MoviesMainSection />
    </>
  );
};

export default Home;
