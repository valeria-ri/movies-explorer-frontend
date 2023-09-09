import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import './SearchForm.css';

function SearchForm({form, handleChange, searchMovies, errorMessage}) {

  function handleSubmit (e) {
    e.preventDefault();
    searchMovies(form.keyword, form.checkbox);
  }

  const getErrorClassName = `search-form__input-error ${errorMessage ? 'search-form__input-error_visible' : ''}`;

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
          <span className={getErrorClassName}>{errorMessage}</span>
            <FilterCheckbox onChange={handleChange} value={form.checkbox} />
        </form>
      </div>
    </section>
  )
}

export default SearchForm;
