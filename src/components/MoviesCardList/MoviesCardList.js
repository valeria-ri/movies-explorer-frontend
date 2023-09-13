import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useResize from '../../hooks/useResize';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { countAddedMovies, countInitialMovies } from '../../utils/utils';

function MoviesCardList({ filteredMovies, onSaveMovie, onDeleteMovie, isSavedCheck, errorMessage, notFoundMessage, isLoading }) {
  const location = useLocation().pathname;
  const [moviesAmount, setMoviesAmount] = useState('');
  const [addAmount, setAddAmount] = useState('');
  
  const windowWidth = useResize();
  
  useEffect(() => {
    setMoviesAmount(countInitialMovies(windowWidth));
    setAddAmount(countAddedMovies(windowWidth));
  }, [windowWidth, filteredMovies]);

  const limitedMovies = filteredMovies.slice(0, moviesAmount);
  
  function onMoreBtnClick() {
    setMoviesAmount(moviesAmount + addAmount);
  }
    
  return (
    <section className='movies-card-list'>
      {
        filteredMovies.length === 0 
        && !errorMessage 
        && notFoundMessage 
        && <p className='movies-card-list__not-found'>{notFoundMessage}</p>
      }
      {location === '/movies' && isLoading && <Preloader />}
      <ul className='movies-card-list__grid'>
        {
          ((location === '/movies') ? limitedMovies : filteredMovies)
            .map(movie => (
              <MoviesCard 
                key={movie._id || movie.movieId}
                movie={movie}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                isSavedCheck={isSavedCheck}
              />
            ))
        }
      </ul>

      {
        (location === '/movies' && (moviesAmount < filteredMovies.length)) 
        && <button className='movies-card-list__button button' type='button' onClick={onMoreBtnClick}>Ещё</button>
      }
    </section>
  )
}

export default MoviesCardList;
