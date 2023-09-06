import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { moviesFormat, filterMovies } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';
import MoviePage from '../MoviePage/MoviePage';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getMovies() {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        setMovies(moviesFormat(movies));
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  return (
    <MoviePage getMovies={getMovies} movies={movies} />
  )
}

export default Movies;
