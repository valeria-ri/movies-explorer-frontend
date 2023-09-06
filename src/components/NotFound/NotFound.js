import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className='content'>
      <section className='not-found'>
        <div className='not-found__error'>
          <h1 className='not-found__error-number'>404</h1>
          <p className='not-found__error-text'>Страница не найдена</p>
        </div>
        <Link className='not-found__link link' to='/'>Назад</Link>
      </section>
    </main>
  )
}

export default NotFound;