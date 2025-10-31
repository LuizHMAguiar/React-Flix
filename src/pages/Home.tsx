import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import { type Movie } from '../types';
import '../App.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (e:React.FormEvent) => {
    console.log('Searching for:', query);
    e.preventDefault();
    const results = await searchMovies(query);
    console.log('Results:', results);
    setMovies([])
    setMovies(results);
  };

  return (
    <div>
      <h1>Busque por um filme</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do filme..."/>
        <button type="submit">Buscar</button>
      </form>

      <div className="movies-grid">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
            className={`movie-card movie-card-bg${!movie.Poster || movie.Poster === 'N/A' ? ' movie-card-noimg' : ''}`}
            style={movie.Poster && movie.Poster !== 'N/A' ? { ['--poster-url' as any]: `url(${movie.Poster})` } : {}}
          >
            <div className="movie-card-overlay">
              <h3>{movie.Title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>);
}