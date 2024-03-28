import './App.css';
import GenresContainer from './Containers/GenresContainer';
import NavBar from './Containers/NavBar';
import NowPlayingSectionContainer from './Containers/NowPlayingSectionContainer';
import MoviesDataContextProvider from './Context/MoviesDataContextProvider';

function App() {
  return (
    <MoviesDataContextProvider>
      <main>
        <NavBar />
        <NowPlayingSectionContainer />
        <GenresContainer />
      </main>
    </MoviesDataContextProvider>
  );
}

export default App;
