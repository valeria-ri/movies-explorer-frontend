import MoviePage from '../MoviePage/MoviePage';

function SavedMovies({ movies, onDeleteMovie, isSavedCheck }) {
  return (
    <MoviePage movies={movies} onDeleteMovie={onDeleteMovie} isSavedCheck={isSavedCheck} />
  )
}

export default SavedMovies;