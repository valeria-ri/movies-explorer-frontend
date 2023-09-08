import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
  function scroller() {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth'});
  };

  return (
    <main className='content'>
      <Promo scroller={scroller} />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}

export default Main;
