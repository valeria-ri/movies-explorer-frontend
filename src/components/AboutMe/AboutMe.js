import './AboutMe.css';
import aboutMeImg from '../../images/about-me-image.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <div className='about-me__content-box content-box'>
        <h2 className='about-me__title title'>Студент</h2>
        <div className='about-me__content'>
          <div className='about-me__info'>
            <article className='about-me__info-article'>
              <h3 className='about-me__name'>Валерия</h3>
              <h4 className='about-me__job'>Фронтенд-разработчик (почти) 24 года</h4>
              <p className='about-me__text'>
                Привет! Я начинающий фронтенд-разработчик из Москвы. По образованию экономист и project-менеджер, 
                но, учась в университете, поняла, что душа моя больше лежит к творчеству и IT. Без долгих поисков 
                выбор пал на фронтенд-разработку, поскольку мне нравится сразу видеть результат своей работы.
                Это похоже на &#10024;магию&#10024;: ты пишешь код-заклинание и элементы твоей веб-страницы 
                или приложения оживают.<br/><br/>В данный момент занимаюсь фриланс- и пет-проектами.
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