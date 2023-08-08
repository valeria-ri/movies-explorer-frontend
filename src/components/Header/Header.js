import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/logo.svg';

function Header({ isLoggedIn, onBurgerClick }) {
  const location = useLocation();
  const headerClassName = `header${
    (location.pathname === '/') ? '_type_landing' : 
    (
      location.pathname === '/movies' || 
      location.pathname === '/saved-movies' || 
      location.pathname === '/profile'
    ) ? '' :
    '_hidden'
  }`;
  
  return (
    <header className={headerClassName}>
      <div className='header__content-box content-box'>
        <Link className='header__logo-link link' to='/'>
          <img className='header__logo' src={logo} alt='лого' />
        </Link>
        <Navigation 
          isLoggedIn={isLoggedIn}
          onBurgerClick={onBurgerClick}
        />
      </div>
    </header>
  )
}

export default Header;