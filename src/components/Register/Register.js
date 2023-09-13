import AuthBlock from '../AuthBlock/AuthBlock';
import useForm from '../../hooks/useForm';
import { useState } from 'react';
import { CUSTOM_MESSAGE } from '../../utils/constants';

function Register({registerUser}) {
  const [serverMessage, setServerMessage] = useState('');

  const { form, errors, handleChange, isValid } = useForm({
    email: '',
    password: '',
    name: '',
  });

  function handleSubmit (e) {
    e.preventDefault();
      registerUser(form)
      .catch((errorCode) => {
        if (errorCode === 400) return setServerMessage(CUSTOM_MESSAGE.BAD_REQUEST);
        if (errorCode === 409) return setServerMessage(CUSTOM_MESSAGE.CONFLICT);
        setServerMessage(CUSTOM_MESSAGE.SERVER_ERROR);
      });
  }

  function getErrorClassName (name) {
    return `auth__input-error ${errors[name] ? 'auth__input-error_visible' : ''}`
  }

  return(
    <main className='content'>
      <AuthBlock 
        handleSubmit={handleSubmit}
        isValid={isValid}
        welcomeText='Добро пожаловать!'
        formName='signup'
        btnText='Зарегистрироваться'
        questionText='Уже зарегистрированы?'
        linkPath='/signin'
        linkText='Войти'
        serverMessage={serverMessage}
      >
        <fieldset className='auth__field'>
          <label className='auth__input-title'>Имя</label>
          <input
            className='auth__input auth__input_type_name'
            type='text'
            name='name'
            placeholder='Имя'
            id='name'
            value={form.name}
            onChange={handleChange}
            minLength='2'
            maxLength='30'
            required
          />
          <span className={getErrorClassName('name')}>{errors.name}</span>
        </fieldset>
        <fieldset className='auth__field'>
          <label className='auth__input-title'>E-mail</label>
          <input
            className='auth__input auth__input_type_email'
            type='email'
            name='email'
            placeholder='E-mail'
            id='email'
            value={form.email}
            onChange={handleChange}
            required
          />
          <span className={getErrorClassName('email')}>{errors.email}</span>
        </fieldset>
        <fieldset className='auth__field'>
          <label className='auth__input-title'>Пароль</label>
          <input
            className='auth__input auth__input_type_password'
            type='password'
            name='password'
            placeholder='Пароль'
            id='password'
            value={form.password}
            onChange={handleChange}
            minLength='8'
            required
            noValidate
          />
          <span className={getErrorClassName('password')}>{errors.password}</span>
        </fieldset>
      </AuthBlock>
    </main>
  )
}

export default Register;