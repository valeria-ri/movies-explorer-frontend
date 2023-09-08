import MoviePage from '../MoviePage/MoviePage';

function SavedMovies({ movies, onDeleteMovie }) {
  return (
    <MoviePage movies={movies} onDeleteMovie={onDeleteMovie} />
  )
}

export default SavedMovies;