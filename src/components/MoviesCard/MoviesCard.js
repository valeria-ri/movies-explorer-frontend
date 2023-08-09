import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({image, nameRU, duration, isSaved}) {
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
          <h2 className='movies-card__movie-name'>{nameRU}</h2>
          <p className='movies-card__duration'>{duration}</p>
        </div>
        <button className={btnClassName} type='button' />
      </div>
      <img className='movies-card__image' src={image} alt={nameRU} />
    </li>
  )
}

export default MoviesCard;
