import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { moviesFormat } from '../../utils/utils';

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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState(restoreMovies());

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const navigate = useNavigate();

  // ПРОВЕРКА ТОКЕНА

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      setIsLoading(false);
      return;
    }

    mainApi
      .getUserData(token)
      .then(() => {
        mainApi.setToken(token);
        setIsLoggedIn(true);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        mainApi.getUserInfo(),
        mainApi.getSavedMovies()
      ])
      .then(([userData, savedMoviesData]) => {
        setCurrentUser(userData);
        setSavedMovies(savedMoviesData.reverse());
      })
      .catch(console.error);
    }
  }, [isLoggedIn])

  // РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ

  function registerUser({ email, password, name }) {
    return mainApi
      .register({ email, password, name })
      .then(() => loginUser({ email, password }))
  }

  function loginUser({ email, password }) {
    return mainApi
      .authorize({ email, password })
      .then(res => {
        setIsLoggedIn(true);
        mainApi.setToken(res.token);
        localStorage.setItem('jwt', res.token);
        navigate('/movies');
      })
  }

  function logOut() {
    localStorage.clear();
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    setIsLoggedIn(false);
  }

  // ОБНОВЛЕНИЕ ДАННЫХ ПРОФИЛЯ

  function handleUpdateUser({ email, name }) {
    return mainApi
      .updateUserInfo({ email, name })
      .then((data) => setCurrentUser(data))
  }

  // УПРАВЛЕНИЕ БУРГЕР-МЕНЮ

  function handleBurgerClick() {
    setIsMenuOpened(true);
  }

  function closeBurgerMenu() {
    setIsMenuOpened(false);
  }

  // ВСЕ ФИЛЬМЫ

  function restoreMovies() {
    return JSON.parse(localStorage.getItem('movies') ?? '[]');
  }

  function getMovies() {
    return moviesApi
      .getMovies()
      .then(newMovies => {
        const formattedMovies = moviesFormat(newMovies)
        setMovies(formattedMovies);
        localStorage.setItem('movies', JSON.stringify(formattedMovies));
      })
      .catch(console.error)
  }

  // СОХРАНЕНИЕ И УДАЛЕНИЕ ФИЛЬМОВ

  function handleSaveMovie(movie) {
    mainApi
      .createMovie(movie)
      .then(newMovie => setSavedMovies([newMovie, ...savedMovies]))
      .catch(console.error)
  }

  function handleDeleteMovie(movie) {
    const movieId = movie._id || savedMovies.find(i => i.movieId === movie.movieId)._id;
    mainApi
      .deleteMovie(movieId)
      .then(() => setSavedMovies(state => state.filter(i => i._id !== movieId)))
      .catch(console.error)
  }

  function isSavedCheck(movie) {
    return savedMovies.some(i => (i._id === movie._id) || (i.movieId === movie.movieId));
  }

  // ПРЕЛОАДЕР

  if (isLoading) return (<Preloader type='page' />)

  // ОТРИСОВКА КОМПОНЕНТОВ

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

          {/* ЗАЩИЩЁННЫЙ РОУТ */}
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />} >
            <Route 
              path='/movies' 
              element={
                <Movies movies={movies} getMovies={getMovies} onSaveMovie={handleSaveMovie} onDeleteMovie={handleDeleteMovie} isSavedCheck={isSavedCheck} />
              } 
            />
            <Route 
              path='/saved-movies' 
              element={
                <SavedMovies movies={savedMovies} onDeleteMovie={handleDeleteMovie} isSavedCheck={isSavedCheck}/>
              } 
            />
            <Route 
              path='/profile' 
              element={
                <Profile logOut={logOut} handleUpdateUser={handleUpdateUser}/>
              } 
            />
          </Route>

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
