import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useForm from '../../hooks/useForm';
import './Profile.css';
import { CUSTOM_MESSAGE } from '../../utils/constants';

function Profile({handleUpdateUser, logOut}) {
  const [isEdited, setIsEdited] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [serverMessageSuccessMode, setServerMessageSuccessMode] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const { form, errors, handleChange, isValid, resetForm } = useForm({
    email: currentUser.email,
    name: currentUser.name,
  });

  useEffect(() => {
    resetForm({
      email: currentUser.email,
      name: currentUser.name,
    })
  }, [currentUser]);

  const isNotEqual = form.email !== currentUser.email || form.name !== currentUser.name;

  useEffect(() => {
    if (!isEdited) return;
    setServerMessage('');
  }, [isEdited])

  function handleSubmit (e) {
    e.preventDefault();
    handleUpdateUser(form)
      .then(() => {
        setIsEdited(false);
        setServerMessage(CUSTOM_MESSAGE.SUCCESS)
        setServerMessageSuccessMode(true);
      })
      .catch((errorCode) => {
        setServerMessageSuccessMode(false);
        if (errorCode === 400) return setServerMessage(CUSTOM_MESSAGE.BAD_REQUEST);
        if (errorCode === 409) return setServerMessage(CUSTOM_MESSAGE.CONFLICT);
        setServerMessage(CUSTOM_MESSAGE.SERVER_ERROR)
      });
  }

  function handleEditMode(e) {
    e.preventDefault();
    setServerMessage('');
    setIsEdited(true);
  }

  function getErrorClassName (name) {
    return `profile__input-error ${errors[name] ? 'profile__input-error_visible' : ''}`
  }

 const serverMessageClassName = `profile__server-message ${serverMessageSuccessMode ? 'profile__server-message_success' : ''}`;

  return (
    <main className='profile'>
      <h1 className='profile__welcome'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' name='profile' onSubmit={handleSubmit}>
        <fieldset className='profile__field'>
          <label className='profile__input-title'>Имя</label>
          <input
            className='profile__input profile__input_type_name'
            type='text'
            name='name'
            placeholder='Имя'
            value={form.name || ''}
            id='name'
            onChange={handleChange}
            disabled={!isEdited}
            minLength='2'
            maxLength='30'
            required
          />
        </fieldset>
        <span className={getErrorClassName('name')}>{errors.name}</span>
        <fieldset className='profile__field'>
          <label className='profile__input-title'>E-mail</label>
          <input
            className='profile__input profile__input_type_email'
            type='email'
            name='email'
            placeholder='E-mail'
            value={form.email || ''}
            id='email'
            onChange={handleChange}
            disabled={!isEdited}
            required
          />
        </fieldset>
        <span className={getErrorClassName('email')}>{errors.email}</span>
        {isEdited ? 
          <div className='profile__actions profile__actions_type_edit'>
            <span className={serverMessageClassName}>{serverMessage}</span>
            <button className='profile__submit button' type='submit' disabled={!isValid || !isNotEqual}>Сохранить</button>
          </div>
          :
          <div className='profile__actions profile__actions_type_profile'>
            <span className={serverMessageClassName}>{serverMessage}</span>
            <button className='profile__button profile__button_type_edit button' type='button' onClick={handleEditMode}>Редактировать</button>
            <button className='profile__button profile__button_type_logout button' type='button' onClick={logOut}>Выйти из аккаунта</button>
          </div>
        }
      </form>
    </main>
  )
}

export default Profile;
