import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { type Movie } from '../types';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();

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
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Ano:</strong> {movie.Year}</p>
      <p><strong>Diretor:</strong> {movie.Director}</p>
      <p><strong>Enredo:</strong> {movie.Plot}</p>
    </div>);
}