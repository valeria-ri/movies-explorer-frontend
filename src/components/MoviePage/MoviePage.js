import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/utils';
import useForm from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';

function MoviePage({ getMovies, movies, onSaveMovie, onDeleteMovie }) {
  const location = useLocation().pathname;

  const [filteredMovies, setFilteredMovies] = useState(restorePrevSearch().filteredMovies);

  const { form, handleChange } = useForm(restorePrevSearch().form);

  useEffect(() => {
    if (movies.length === 0 && getMovies) return;
    setFilteredMovies(filterMovies(movies, form.keyword, form.checkbox));
  }, [movies, form.checkbox]);

  function searchMovies (keyword, isShort) {
    if (movies.length === 0 && getMovies) {
      getMovies();
    } else {
      setFilteredMovies(filterMovies(movies, keyword, isShort));      
    }
  }

  useEffect(() => {
    if (location !== '/movies') return;
    localStorage.setItem('prevSearch', JSON.stringify({
      filteredMovies,
      form,
    }));
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
      <SearchForm form={form} handleChange={handleChange} searchMovies={searchMovies} />
      <MoviesCardList filteredMovies={filteredMovies} onSaveMovie={onSaveMovie} onDeleteMovie={onDeleteMovie} />
    </main>
  )
}

export default MoviePage;
