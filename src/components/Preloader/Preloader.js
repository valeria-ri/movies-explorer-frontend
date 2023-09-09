import './Preloader.css'

function Preloader({ type }) {
  return (
    <div className={`preloader preloader_type_${type}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader;