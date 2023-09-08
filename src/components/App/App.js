import { useEffect, useState } from 'react';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import { moviesFormat } from '../../utils/utils';

function App() {
  // const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState(restoreMovies());

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

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

  // ВСЕ ФИЛЬМЫ

  function restoreMovies() {
    return JSON.parse(localStorage.getItem('movies') ?? '[]');
  }

  function getMovies() {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then(newMovies => {
        const formattedMovies = moviesFormat(newMovies)
        setMovies(formattedMovies);
        localStorage.setItem('movies', JSON.stringify(formattedMovies));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
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

  if (isLoading) return (<Preloader/>)

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
