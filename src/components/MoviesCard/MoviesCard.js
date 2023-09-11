import { useLocation } from 'react-router-dom';
import { durationFormat } from '../../utils/utils';
import './MoviesCard.css';

function MoviesCard({movie, onSaveMovie, onDeleteMovie, isSavedCheck}) {
  const location = useLocation().pathname;
  const isSaved = isSavedCheck(movie);

  const saveBtnClassName = `movies-card__save-btn${isSaved ? ' movies-card__save-btn_active' : ''}`;
  const deleteBtnClassName = 'movies-card__delete-btn';
  const btnClassName = `movies-card__btn 
    ${
      (location === '/movies') ? saveBtnClassName : 
      (location === '/saved-movies') ? deleteBtnClassName : ''
    } button`;

  function handleSaveClick() {
    !isSaved && onSaveMovie(movie);
  }

  function handleDeleteClick() {
    onDeleteMovie(movie);
  }
  
  return (
    <li className='movies-card'>
      <div className='movies-card__info'>
        <div className='movies-card__description'>
          <h2 className='movies-card__movie-name'>{movie.nameRU}</h2>
          <p className='movies-card__duration'>{durationFormat(movie.duration)}</p>
        </div>
        {(location === '/movies') && <button className={btnClassName} type='button' onClick={!isSaved ? handleSaveClick : handleDeleteClick} />}
        {(location === '/saved-movies') && <button className={btnClassName} type='button' onClick={handleDeleteClick} />}
      </div>
      <a className='movies-card__image-link link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img className='movies-card__image' src={movie.image} alt={movie.nameRU} />
      </a>
    </li>
  )
}

export default MoviesCard;
