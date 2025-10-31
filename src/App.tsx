import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <h1>React Flix</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}