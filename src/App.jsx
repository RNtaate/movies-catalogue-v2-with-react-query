import './App.css';
import NavBar from './Containers/NavBar';
import MoviesDataContextProvider from './Context/MoviesDataContextProvider';

function App() {
  return (
    <MoviesDataContextProvider>
      <main>
        <NavBar />
      </main>
    </MoviesDataContextProvider>
  );
}

export default App;
