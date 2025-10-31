import axios from 'axios';

// Vite expõe variáveis de ambiente via import.meta.env. Por convenção use variables prefixadas com VITE_
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_API;

export const searchMovies = async (query:string) => {
  const response = await axios.get(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  return response.data.Search || [];
};

export const getMovieDetails = async (id:string) => {
  const response = await axios.get(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  return response.data;
};