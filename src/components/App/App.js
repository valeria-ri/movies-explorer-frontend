import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

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
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setToken(jwt);
  }, [])

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    mainApi
      .getUserData(token)
      .then((res) => {
        mainApi.setToken(token);
        setIsLoggedIn(true);
        // setCurrentUser(res);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [token])

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        mainApi.getUserInfo(),
        mainApi.getSavedMovies()
      ])
      .then(([userData, savedMoviesData]) => {
        setCurrentUser(userData);
        setSavedMovies(savedMoviesData);
      })
      .catch(console.error);
    }
  }, [isLoggedIn])

  function registerUser({ email, password, name }) {
    mainApi
      .register({ email, password, name })
      .then(() => {
        // setCurrentUser({ email, name });
        // console.log(userData);
        loginUser({ email, password });
        // navigate('/movies');
      })
      .catch(console.error);
  }

  function loginUser({ email, password }) {
    mainApi
      .authorize({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        mainApi.setToken(res.token);
        localStorage.setItem('jwt', res.token);
        navigate('/movies');
      })
      .catch(console.error);
  }

  function logOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setToken('');
    navigate('/');
  }

  function handleUpdateUser({ email, name }) {
    return mainApi
      .updateUserInfo({ email, name })
      .then((data) => {
        setCurrentUser(data);
      })
      // .catch(console.error);
  }

  function handleBurgerClick() {
    setIsMenuOpened(true);
  }

  function closeBurgerMenu() {
    setIsMenuOpened(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header isLoggedIn={isLoggedIn} onBurgerClick={handleBurgerClick} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route 
            path='/signup' 
            element={
              <Register registerUser={registerUser} />
            } 
          />
          <Route 
            path='/signin' 
            element={
              <Login loginUser={loginUser} />
            } 
          />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route 
            path='/profile' 
            element={
              <Profile logOut={logOut} handleUpdateUser={handleUpdateUser}/>
            } 
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <BurgerMenu
          isOpen={isMenuOpened}
          onClose={closeBurgerMenu}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
