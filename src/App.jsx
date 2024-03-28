import './App.css';
import NavBar from './Containers/NavBar';
import NowPlayingSectionContainer from './Containers/NowPlayingSectionContainer';
import MoviesDataContextProvider from './Context/MoviesDataContextProvider';

function App() {
  return (
    <MoviesDataContextProvider>
      <main>
        <NavBar />
        <NowPlayingSectionContainer />
      </main>
    </MoviesDataContextProvider>
  );
}

export default App;
