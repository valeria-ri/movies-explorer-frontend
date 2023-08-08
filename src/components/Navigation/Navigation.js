import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, onBurgerClick }) {
  const location = useLocation();
  const navClassName = `navigation ${isLoggedIn ? '' : 'navigation_unauth'}`;
  const movieActiveLinkClassName = (location.pathname === '/movies') ? 'navigation__link_active' : '';
  const savedMovieActiveLinkClassName = (location.pathname === '/saved-movies') ? 'navigation__link_active' : '';

  return (
    <>
      {!isLoggedIn ? (
        <nav className={navClassName}>
          <NavLink className='navigation__link navigation__link_type_signup link' to='/signup'>Регистрация</NavLink>
          <NavLink className='navigation__link navigation__link_type_signin link' to='/signin'>Войти</NavLink>
        </nav>
      ) : (
        <nav className={navClassName}>
          <nav className='navigation__links'>
            <NavLink className={`navigation__link navigation__link_type_movies ${movieActiveLinkClassName} link`} to='/movies'>Фильмы</NavLink>
            <NavLink className={`navigation__link navigation__link_type_movies ${savedMovieActiveLinkClassName} link`} to='/saved-movies'>Сохранённые фильмы</NavLink>
          </nav>
          <NavLink className='navigation__link navigation__link_type_account link' to='/profile'>Аккаунт</NavLink>
          <button className='navigation__burger button' type='button' onClick={onBurgerClick} />
        </nav>
      )}
    </>
  )
}

export default Navigation;