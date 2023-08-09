import React from 'react';
import AuthBlock from '../AuthBlock/AuthBlock';

function Login() {
  return(
    <main className='content'>
      <AuthBlock 
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
          />
          <span className='auth__input-error auth__input-error_type_email'></span>
        </fieldset>
        <fieldset className='auth__field'>
          <label className='auth__input-title'>Пароль</label>
          <input
            className='auth__input auth__input_type_password'
            type='password'
            name='password'
            placeholder='Пароль'
            id='password'
          />
          <span className='auth__input-error auth__input-error_type_password'></span>
        </fieldset>
      </AuthBlock>
    </main>
  )
}

export default Login;