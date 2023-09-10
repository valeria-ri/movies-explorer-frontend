import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/utils';
import useForm from '../../hooks/useForm';

function MoviePage({ getMovies, movies, onSaveMovie, onDeleteMovie, isSavedCheck }) {
  const location = useLocation().pathname;

  const [filteredMovies, setFilteredMovies] = useState(restorePrevSearch().filteredMovies);
  const [errorMessage, setErrorMessage] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { form, handleChange } = useForm(restorePrevSearch().form);

  useEffect(() => {
    if (movies.length === 0 && getMovies) return;
    if (!form.keyword && location === '/movies') {
      setFilteredMovies([]);
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }
    setFilteredMovies(filterMovies(movies, form.keyword, form.checkbox));
  }, [movies, form.checkbox]);

  function searchMovies (keyword, isShort) {
    if (movies.length === 0 && getMovies) {
      setErrorMessage('');
      setIsLoading(true);
      getMovies()
        .finally(() => setIsLoading(false));
    } else if (!keyword && location === '/movies') {
      setFilteredMovies([]);
      setErrorMessage('Нужно ввести ключевое слово');
    } else {
      setErrorMessage('');
      setFilteredMovies(filterMovies(movies, keyword, isShort));
    }
  }

  useEffect(() => {
    if (location === '/movies' && movies.length === 0 || location !== '/movies') return;
    localStorage.setItem('prevSearch', JSON.stringify({
      filteredMovies,
      form,
    }));
    setNotFoundMessage((filteredMovies.length === 0) ? 'Ничего не найдено' : '');
  }, [filteredMovies, form.checkbox]);

  function restorePrevSearch() {
    if (location !== '/movies') return {
      filteredMovies: [],
      form: {
        keyword: '',
        checkbox: false,
      },
    };
    const prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
    if (!prevSearch) return {
      filteredMovies: [],
      form: {
        keyword: '',
        checkbox: false,
      },
    };
    return prevSearch;
  };

  return (
    <main className='content'>
      <SearchForm form={form} handleChange={handleChange} searchMovies={searchMovies} errorMessage={errorMessage} />
      <MoviesCardList 
        filteredMovies={filteredMovies} 
        onSaveMovie={onSaveMovie} 
        onDeleteMovie={onDeleteMovie} 
        isSavedCheck={isSavedCheck} 
        errorMessage={errorMessage}
        notFoundMessage={notFoundMessage}
        isLoading={isLoading}
      />
    </main>
  )
}

export default MoviePage;
