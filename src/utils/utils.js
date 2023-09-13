import { MOVIES_URL, SHORT_MOVIE, SCREEN_SIZE, MOVIES_AMOUNT, ADDED_MOVIES_AMOUNT } from "./constants";

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
      return movie.duration <= SHORT_MOVIE;
    })
    return shortMovies;
  } else {
    return filteredByKeywordMovies;
  }
}

// ОТОБРАЖЕНИЕ КОЛИЧЕСТВА КАРТОЧЕК В ЗАВИСИМОСТИ ОТ ШИРИНЫ ЭКРАНА
function countInitialMovies(width) {
  let moviesAmount;
  if (width < SCREEN_SIZE.M) moviesAmount = MOVIES_AMOUNT.S;
  if (width >= SCREEN_SIZE.M) moviesAmount = MOVIES_AMOUNT.M;
  if (width >= SCREEN_SIZE.L) moviesAmount = MOVIES_AMOUNT.L;
  return moviesAmount;
}

function countAddedMovies(width) {
  let addAmount;
  if (width < SCREEN_SIZE.L) addAmount = ADDED_MOVIES_AMOUNT.S;
  if (width >= SCREEN_SIZE.L) addAmount = ADDED_MOVIES_AMOUNT.L;
  return addAmount;
}

export {
  moviesFormat,
  durationFormat,
  filterMovies,
  countInitialMovies,
  countAddedMovies,
};
