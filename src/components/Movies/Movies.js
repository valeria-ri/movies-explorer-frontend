import MoviePage from '../MoviePage/MoviePage';

function Movies({getMovies, movies, onSaveMovie, onDeleteMovie, isSavedCheck}) {
  return (
    <MoviePage getMovies={getMovies} movies={movies} onSaveMovie={onSaveMovie} onDeleteMovie={onDeleteMovie} isSavedCheck={isSavedCheck} />
  )
}

export default Movies;
