import { BASE_URL } from './constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getJson(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);  
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson);
  }

  setToken(token) {
    this._headers = { ...this._headers, authorization: `Bearer ${token}` };
  }

  register({ email, password, name }) {
    return this._request(
      `${this._url}/signup`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ email, password, name }),
      }
    )
  }

  authorize({ email, password }) {
    return this._request(
      `${this._url}/signin`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ email, password }),
      }
    )
  }

  getUserData(token) {
    return this._request(
      `${this._url}/users/me`,
      {
        method: 'GET',
        headers: { ...this._headers, authorization: `Bearer ${token}` }
      }
    )
  }

  getUserInfo() {
    return this._request(
      `${this._url}/users/me`,
      { headers: this._headers }
    )
  }

  updateUserInfo({ email, name }) {
    return this._request(
      `${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ email, name }),
      }
    )
  }

  getSavedMovies() {
    return this._request(
      `${this._url}/movies`,
      { headers: this._headers }
    )
  }

  createMovie(movie) {
    return this._request(
      `${this._url}/movies`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(movie),
      }
    )
  }

  deleteMovie(id) {
    return this._request(
      `${this._url}/movies/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
      }
    )
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export { mainApi };