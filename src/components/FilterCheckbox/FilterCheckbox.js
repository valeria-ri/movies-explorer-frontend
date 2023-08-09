import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <fieldset className='search-form__field search-form__field_type_shorts'>
      <input className='search-form__checkbox' type='checkbox' id='shorts' />
      <label className='search-form__checkbox-label' htmlFor='shorts' />
      <p className='search-form__checkbox-title'>Короткометражки</p>
    </fieldset>
  )
}

export default FilterCheckbox;