import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const location = useLocation().pathname;
  const footerClassName = `footer${
    (
      location === '/' ||
      location === '/movies' || 
      location === '/saved-movies'
    ) ? '' :
    '_hidden'
  }`;

  return (
    <footer className={footerClassName}>
      <p className='footer__project'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
      <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
      <ul className='footer__socials'>
        <li>
          <a className='footer__link link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
        </li>
        <li>
          <a className='footer__link link' href='https://github.com/valeria-ri' target='_blank' rel='noreferrer'>Github</a>
        </li>
      </ul>
      </div>
    </footer>
  )
}

export default Footer;