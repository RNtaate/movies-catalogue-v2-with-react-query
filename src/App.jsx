import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'react-activity/dist/library.css';

import MoviesDataContextProvider from './Context/MoviesDataContextProvider';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <MoviesDataContextProvider>
      <main className="w-screen min-h-screen max-h-screen overflow-auto backdrop-blur-lg bg-white/10 text-white font-montserrat">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </MoviesDataContextProvider>
  );
}

export default App;
