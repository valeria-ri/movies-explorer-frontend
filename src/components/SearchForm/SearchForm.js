import { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import './SearchForm.css';

function SearchForm({form, handleChange, searchMovies}) {

  function handleSubmit (e) {
    e.preventDefault();
    searchMovies(form.keyword, form.checkbox);
  }

  return (
    <section className='search-form'>
      <div className='search-form__content-box content-box'>
        <div className='search-form__icon' />
        <form className='search-form__form' name='search' onSubmit={handleSubmit} noValidate>
          <fieldset className='search-form__field search-form__field_type_search'>
            <input 
              className='search-form__input'
              type='text'
              name='keyword'
              value={form.keyword}
              placeholder='Фильм'
              id='search'
              onChange={handleChange}
            />
            <button className='search-form__button button' type='submit' />
          </fieldset>
            <FilterCheckbox onChange={handleChange} value={form.checkbox} />
        </form>
      </div>
    </section>
  )
}

export default SearchForm;
