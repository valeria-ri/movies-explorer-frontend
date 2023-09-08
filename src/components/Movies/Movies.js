import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { moviesFormat, filterMovies } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';
import MoviePage from '../MoviePage/MoviePage';

function Movies({getMovies, movies, onSaveMovie}) {
  return (
    <MoviePage getMovies={getMovies} movies={movies} onSaveMovie={onSaveMovie} />
  )
}

export default Movies;
