import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

// временное решение для визуализации вёрстки до подключения API
import movies from '../../utils/movies';

function MoviesCardList() {
  const location = useLocation();
  const savedMovies = movies.filter(movie => movie.saved);

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__grid'>
        {
          (location.pathname === '/movies') ? movies.map((movie, i) => (
          <MoviesCard 
            key={i} 
            image={movie.image}
            nameRU={movie.nameRU}
            duration={movie.duration}
            isSaved={movie.saved} 
          />
          )) :
          (location.pathname === '/saved-movies') && savedMovies.map((movie, i) => (
            <MoviesCard 
              key={i} 
              image={movie.image}
              nameRU={movie.nameRU}
              duration={movie.duration}
              isSaved={movie.saved} 
            />
          ))
        }
      </ul>
      {(location.pathname === '/movies') && <button className='movies-card-list__button button' type='button'>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
