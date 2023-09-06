import React from 'react';
import AuthBlock from '../AuthBlock/AuthBlock';
import useForm from '../../hooks/useForm';

function Login({loginUser}) {
  
  const { form, errors, handleChange, isValid } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit (e) {
    e.preventDefault();
    loginUser(form);
  }

  function getErrorClassName (name) {
    return `auth__input-error ${errors[name] ? 'auth__input-error_visible' : ''}`
  }

  return(
    <main className='content'>
      <AuthBlock 
        handleSubmit={handleSubmit}
        isValid={isValid}
        welcomeText='Рады видеть!'
        formName='signin'
        btnText='Войти'
        questionText='Ещё не зарегистрированы?'
        linkPath='/signup'
        linkText='Регистрация'
      >
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
          />
          <span className={getErrorClassName('password')}>{errors.password}</span>
        </fieldset>
      </AuthBlock>
    </main>
  )
}

export default Login;