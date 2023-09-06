import { useLocation } from 'react-router-dom';
import { durationFormat } from '../../utils/utils';
import './MoviesCard.css';

function MoviesCard({movie, isSaved}) {
  const location = useLocation();
  const saveBtnClassName = `movies-card__save-btn ${isSaved ? 'movies-card__save-btn_active' : ''}`;
  const deleteBtnClassName = 'movies-card__delete-btn';
  const btnClassName = `movies-card__btn 
    ${
      (location.pathname === '/movies') ? saveBtnClassName : 
      (location.pathname === '/saved-movies') ? deleteBtnClassName : ''
    } button`;
  
  return (
    <li className='movies-card'>
      <div className='movies-card__info'>
        <div className='movies-card__description'>
          <h2 className='movies-card__movie-name'>{movie.nameRU}</h2>
          <p className='movies-card__duration'>{durationFormat(movie.duration)}</p>
        </div>
        <button className={btnClassName} type='button' />
      </div>
      <img className='movies-card__image' src={movie.image} alt={movie.nameRU} />
    </li>
  )
}

export default MoviesCard;
