import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();
  function goToPrevPage() {
    navigate(-1);
  }

  return (
    <main className='content'>
      <section className='not-found'>
        <div className='not-found__error'>
          <h1 className='not-found__error-number'>404</h1>
          <p className='not-found__error-text'>Страница не найдена</p>
        </div>
        <button className='not-found__link button' type='button' onClick={goToPrevPage}>Назад</button>
      </section>
    </main>
  )
}

export default NotFound;