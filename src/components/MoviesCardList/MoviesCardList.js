import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useResize from '../../hooks/useResize';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { countAddedMovies, countInitialMovies } from '../../utils/utils';

function MoviesCardList({ filteredMovies, onSaveMovie, onDeleteMovie, isSavedCheck }) {
  const location = useLocation().pathname;
  const [moviesAmount, setMoviesAmount] = useState('');
  const [addAmount, setAddAmount] = useState('');

  const windowWidth = useResize();
  
  useEffect(() => {
    setMoviesAmount(countInitialMovies(windowWidth));
    setAddAmount(countAddedMovies(windowWidth));
  }, [windowWidth]);

  const limitedMovies = filteredMovies.slice(0, moviesAmount);
  
  function onMoreBtnClick() {
    setMoviesAmount(moviesAmount + addAmount);
  }
    
  return (
    <section className='movies-card-list'>
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

      {(location === '/movies') && <button className='movies-card-list__button button' type='button' onClick={onMoreBtnClick}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
