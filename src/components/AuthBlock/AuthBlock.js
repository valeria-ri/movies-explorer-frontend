import React from 'react';
import { Link } from 'react-router-dom';
import './AuthBlock.css';
import logo from '../../images/logo.svg';

function AuthBlock({welcomeText, formName, children, btnText, questionText, linkPath, linkText}) {
  return(
    <section className='auth'>
      <Link className='auth__logo-link link' to='/'>
        <img className='auth__logo' src={logo} alt='лого' />
      </Link>
      <h1 className='auth__welcome'>{welcomeText}</h1>
      <form className='auth__form' name={formName}>
        {children}
        <div className='auth__actions'>
          <button className='auth__submit button' type='submit'>{btnText}</button>
          <p className='auth__question'>
            {questionText}
            <Link className='auth__link link' to={linkPath}> {linkText}</Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default AuthBlock;