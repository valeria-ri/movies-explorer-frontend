import { Link, useLocation } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu({ isOpen, onClose }) {
  const location = useLocation();
  return (
    <section className={`menu ${isOpen ? 'menu_opened' : ''}`}>
      <div className='menu__popup'>
        <button className='menu__close-btn button' type='button' onClick={onClose} />
        <ul className='menu__links'>
          <li className='menu__link-item'>
            <Link
              className={`menu__link ${(location.pathname === '/') ? 'menu__link_active' : ''} link`}
              to='/'
              onClick={onClose}
            >Главная</Link>
          </li>
          <li className='menu__link-item'>
            <Link
              className={`menu__link ${(location.pathname === '/movies') ? 'menu__link_active' : ''} link`}
              to='/movies'
              onClick={onClose}
            >Фильмы</Link>
          </li>
          <li className='menu__link-item'>
            <Link
              className={`menu__link ${(location.pathname === '/saved-movies') ? 'menu__link_active' : ''} link`}
              to='/saved-movies'
              onClick={onClose}
            >Сохранённые фильмы</Link>
          </li>
        </ul>
        <Link className='menu__profile-link link' to='/profile' onClick={onClose}>Аккаунт</Link>
      </div>
    </section>
  )
}

export default BurgerMenu;