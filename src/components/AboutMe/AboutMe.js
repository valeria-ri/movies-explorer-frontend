import React from 'react';
import './AboutMe.css';
import aboutMeImg from '../../images/about-me-image.png';

function AboutMe() {
  return (
    <section className='about-me'>
      <div className='about-me__content-box content-box'>
        <h2 className='about-me__title title'>Студент</h2>
        <div className='about-me__content'>
          <div className='about-me__info'>
            <article className='about-me__info-article'>
              <h3 className='about-me__name'>Виталий</h3>
              <h4 className='about-me__job'>Фронтенд-разработчик, 30 лет</h4>
              <p className='about-me__text'>
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
                Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал 
                в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься 
                фриланс-заказами и ушёл с постоянной работы.
              </p>
            </article>
            <a className='about-me__link link' href='https://github.com/valeria-ri' target='_blank' rel='noreferrer'>Github</a>
          </div>
          <img className='about-me__image' src={aboutMeImg} alt='Фото студента' />
        </div>
      </div>
    </section>
  )
}

export default AboutMe;