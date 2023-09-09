import { MOVIES_URL } from "./constants";

// ПРИВЕДЕНИЕ ФОРМАТА ИСХОДНОГО ОБЪЕКТА К НУЖНОМУ ОБРАЗЦУ
function moviesFormat(movies) {
  return movies.map((movie) => {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${MOVIES_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }
  })
}

// ОТОБРАЖЕНИЕ СТРОКИ ДЛИТЕЛЬНОСТИ ФИЛЬМА
function durationFormat(time) {
  return `${Math.floor(time / 60)}ч ${time % 60}м`;
}

// ФИЛЬТРАЦИЯ ФИЛЬМОВ ПО КЛЮЧЕВОМУ СЛОВУ И ДЛИТЕЛЬНОСТИ
function filterMovies(movies, keyword, isShort) {
  const checkInclude = (item) => {
    return item.toLowerCase().includes(keyword.toLowerCase())
  }

  const filteredByKeywordMovies = movies.filter((movie) => {
    return checkInclude(movie.nameRU) || checkInclude(movie.nameEN);
  })

  if (isShort) {
    const shortMovies = filteredByKeywordMovies.filter((movie) => {
      return movie.duration <= 40;
    })
    return shortMovies;
  } else {
    return filteredByKeywordMovies;
  }
}

// ОТОБРАЖЕНИЕ КОЛИЧЕСТВА КАРТОЧЕК В ЗАВИСИМОСТИ ОТ ШИРИНЫ ЭКРАНА
function countInitialMovies(width) {
  let moviesAmount;
  if (width < 768) moviesAmount = 5;
  if (width >= 768) moviesAmount = 8;
  if (width >= 1280) moviesAmount = 12;
  return moviesAmount;
}

function countAddedMovies(width) {
  let addAmount;
  if (width < 1280) addAmount = 2;
  if (width >= 1280) addAmount = 3;
  return addAmount;
}

export {
  moviesFormat,
  durationFormat,
  filterMovies,
  countInitialMovies,
  countAddedMovies,
};
