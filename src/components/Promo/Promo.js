import './Promo.css';

function Promo({ scroller }) {
  return (
    <section className='promo'>
      <div className='promo__content-box content-box'>
        <article className='promo__content'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button type='button' className='promo__button button' onClick={scroller}>Узнать больше</button>
        </article>
        <div className='promo__image' />
      </div>
    </section>
  )
}

export default Promo;