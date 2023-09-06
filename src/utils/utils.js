import { MOVIES_URL } from "./constants";

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

function durationFormat(time) {
  return `${Math.floor(time / 60)}ч ${time % 60}м`;
}

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

export {
  moviesFormat,
  durationFormat,
  filterMovies
};
