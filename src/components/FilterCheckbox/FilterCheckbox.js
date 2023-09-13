import './FilterCheckbox.css';

function FilterCheckbox({ onChange, value }) {
  return (
    <fieldset className='search-form__field search-form__field_type_shorts'>
      <input 
        className='search-form__checkbox' 
        type='checkbox' 
        name='checkbox'
        checked={value}
        id='shorts' 
        onChange={onChange}
      />
      <label className='search-form__checkbox-label' htmlFor='shorts' />
      <p className='search-form__checkbox-title'>Короткометражки</p>
    </fieldset>
  )
}

export default FilterCheckbox;