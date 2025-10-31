import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { type Movie } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();

  const posterWidth = 300;
  const posterHeight = 445;

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  let isFavorite=false;
  if (movie)
    isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(id?id.toString():'');
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div>Carregando...</div>;

  if (!movie.Title) return <div>Filme não encontrado...</div>;

  return (
    <div className="movie-details-grid">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="movie-details-poster"
        width={posterWidth}
        height={posterHeight}
      />
      <div className="movie-details-info">
        <h2>{movie.Title}</h2>
        <button
            onClick={() => isFavorite ? removeFavorite(movie.imdbID) : addFavorite(movie)}>
            {isFavorite ? '★' : '☆'}
        </button>
        <p><strong>Ano:</strong> {movie.Year}</p>
        <p><strong>Diretor:</strong> {movie.Director}</p>
        <p><strong>Enredo:</strong> {movie.Plot}</p>
      </div>
    </div>
);
}