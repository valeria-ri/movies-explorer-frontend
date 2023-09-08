import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({filteredMovies, onSaveMovie, onDeleteMovie}) {
  const location = useLocation();

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__grid'>
        {
          filteredMovies.map((movie) => (
          <MoviesCard 
            key={movie._id || movie.movieId}
            movie={movie}
            image={movie.image}
            nameRU={movie.nameRU}
            duration={movie.duration}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
          ))
        }
      </ul>
      {/* {(location.pathname === '/movies') && <button className='movies-card-list__button button' type='button'>Ещё</button>} */}
    </section>
  )
}

export default MoviesCardList;
