import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project' id='about'>
      <div className='about-project__content-box content-box'>
        <h2 className='about-project__title title'>О проекте</h2>
        <div className='about-project__info'>
          <article className='about-project__info-block'>
            <h3 className='about-project__info-title'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__info-text'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </article>
          <article className='about-project__info-block'>
            <h3 className='about-project__info-title'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__info-text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </article>
        </div>
        <div className='about-project__schedule'>
          <p className='about-project__duration about-project__duration_accent'>1 неделя</p>
          <p className='about-project__duration'>4 недели</p>
          <p className='about-project__stage'>Back-end</p>
          <p className='about-project__stage'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
