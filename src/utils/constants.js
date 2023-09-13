// API URL
const BASE_URL = 'https://api.valeriari.movies.nomoredomains.xyz';
const MOVIES_URL = 'https://api.nomoreparties.co';

// Регулярное выражение для валидации имени пользователя
const NAME_REGEX = /^[a-zA-Zа-яёА-ЯЁ -]{1,}$/;

// Тексты кастомных ошибок
const CUSTOM_MESSAGE = {
  BAD_REQUEST: 'Данные некорректны',
  CONFLICT: 'Пользователь с данным email уже существует',
  SERVER_ERROR: 'На сервере произошла ошибка',
  NO_KEYWORD: 'Нужно ввести ключевое слово',
  MOVIE_NOT_FOUND: 'Ничего не найдено',
  USER_NOT_FOUND: 'Пользователь не найден',
  SUCCESS: 'Данные обновлены',
};

// Макс. длительность короткометражного фильма
const SHORT_MOVIE = 40;

// Брейкпоинты разрешения экранов
const SCREEN_SIZE = {
  M: 768,
  L: 1280,
};

// Кол-во карточек на разных разрешениях
const MOVIES_AMOUNT = {
  S: 5,
  M: 8,
  L: 12,
};

const ADDED_MOVIES_AMOUNT = {
  S: 2,
  L: 3,
};

export {
  BASE_URL,
  MOVIES_URL,
  NAME_REGEX,
  CUSTOM_MESSAGE,
  SHORT_MOVIE,
  SCREEN_SIZE,
  MOVIES_AMOUNT,
  ADDED_MOVIES_AMOUNT,
};
