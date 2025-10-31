import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { FavoritesProvider } from './contexts/FavoritesContext';
import './App.css';

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className='areatitulo'>
          <div className='titulo'>
            React Flix
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}