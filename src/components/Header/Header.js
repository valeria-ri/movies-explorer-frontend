import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/logo.svg';

function Header({ isLoggedIn, onBurgerClick }) {
  const location = useLocation().pathname;
  const headerClassName = `header${
    (location === '/') ? '_type_landing' : 
    (
      location === '/movies' || 
      location === '/saved-movies' || 
      location === '/profile'
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