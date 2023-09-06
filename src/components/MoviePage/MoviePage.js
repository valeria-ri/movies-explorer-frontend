import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/utils';
import useForm from '../../hooks/useForm';

function MoviePage({ getMovies, movies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const { form, handleChange, resetForm } = useForm({
    keyword: '',
    checkbox: false,
  });

  // useEffect(() => {
  //   resetForm({
  //     keyword: '',
  //     checkbox: false,
  //   })
  // }, [keyword]);

  useEffect(() => {
    if (movies.length === 0 && getMovies) {
      return;
    }
    setFilteredMovies(filterMovies(movies, form.keyword, form.checkbox));
  }, [movies, form.checkbox]);


  function searchMovies (keyword, isShort) {
    if (movies.length === 0 && getMovies) {
      getMovies();
    } else {
      setFilteredMovies(filterMovies(movies, keyword, isShort));
    }
  }

  return (
    <main className='content'>
      <SearchForm form={form} handleChange={handleChange} searchMovies={searchMovies} />
      <MoviesCardList filteredMovies={filteredMovies} />
    </main>
  )
}

export default MoviePage;
