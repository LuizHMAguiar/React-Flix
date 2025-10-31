// contexts/FavoritesContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Movie } from '../types';

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('favoriteMovies');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(movie => movie.imdbID !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>);
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};