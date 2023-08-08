import React, { useState } from 'react';
import './Profile.css';

function Profile({name, email}) {
  const [isEdited, setIsEdited] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);

  const errorClassName = `profile__error${isCorrect ? '_hidden' : ''}`;
  const submitClassName = `profile__submit ${!isCorrect ? 'profile__submit_disabled' : ''} button`;

  return (
    <main className='profile content content-box'>
      <h1 className='profile__welcome'>Привет, {name}!</h1>
      <form className='profile__form' name='profile'>
        <fieldset className='profile__field'>
          <label className='profile__input-title'>Имя</label>
          <input
            className='profile__input profile__input_type_name'
            type='text'
            name='name'
            placeholder='Имя'
            defaultValue={name}
            id='name'
            disabled={!isEdited}
          />
        </fieldset>
        <fieldset className='profile__field'>
          <label className='profile__input-title'>E-mail</label>
          <input
            className='profile__input profile__input_type_email'
            type='email'
            name='email'
            placeholder='E-mail'
            defaultValue={email}
            id='email'
            disabled={!isEdited}
          />
        </fieldset>
        {isEdited ? 
          <div className='profile__actions profile__actions_type_edit'>
            <span className={errorClassName}>При обновлении профиля произошла ошибка.</span>
            <button className={submitClassName} type='submit'>Сохранить</button>
          </div>
          :
          <div className='profile__actions profile__actions_type_profile'>
            <button className='profile__button profile__button_type_edit button' type='button'>Редактировать</button>
            <button className='profile__button profile__button_type_logout button' type='button'>Выйти из аккаунта</button>
          </div>
        }
      </form>
    </main>
  )
}

export default Profile;
