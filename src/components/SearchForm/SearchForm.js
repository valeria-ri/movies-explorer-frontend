import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search-form'>
      <div className='search-form__content-box content-box'>
        <div className='search-form__icon' />
        <form className='search-form__form' name='search'>
          <fieldset className='search-form__field search-form__field_type_search'>
            <input 
              className='search-form__input'
              type='text'
              name='search'
              placeholder='Фильм'
              id='search'
            />
            <button className='search-form__button button' type='submit' />
          </fieldset>
            <FilterCheckbox />
        </form>
      </div>
    </section>
  )
}

export default SearchForm;
