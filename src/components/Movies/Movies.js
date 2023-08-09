import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';

function Movies() {
  return (
    <main className='content'>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
    </main>
  )
}

export default Movies;
