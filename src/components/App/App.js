import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function handleBurgerClick() {
    setIsMenuOpened(true);
  }

  function closeBurgerMenu() {
    setIsMenuOpened(false);
  }

  return (
    <div className='page'>
      <Header isLoggedIn={isLoggedIn} onBurgerClick={handleBurgerClick} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile name='Виталий' email='pochta@yandex.ru' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <BurgerMenu 
        isOpen={isMenuOpened}
        onClose={closeBurgerMenu}
      />
    </div>
  )
}

export default App;
