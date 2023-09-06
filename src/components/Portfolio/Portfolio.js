import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__content-box content-box'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a className='portfolio__link link' href='https://github.com/valeria-ri/how-to-learn' target='_blank' rel='noreferrer'>
              <h3 className='portfolio__project'>Статичный сайт</h3>
              <p className='portfolio__link-arrow'>&#8599;</p>
            </a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link link' href='https://github.com/valeria-ri/russian-travel' target='_blank' rel='noreferrer'>
              <h3 className='portfolio__project'>Адаптивный сайт</h3>
              <p className='portfolio__link-arrow'>&#8599;</p>
            </a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link link' href='https://github.com/valeria-ri/react-mesto-api-full-gha' target='_blank' rel='noreferrer'>
              <h3 className='portfolio__project'>Одностраничное приложение</h3>
              <p className='portfolio__link-arrow'>&#8599;</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;