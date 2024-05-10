import axios from 'axios';
import {
  getGenreListUrl,
  getMovieListUrl,
  getMovieDetailsUrl,
  getNowPlayingMoviesUrl,
  API_KEY,
} from './HelperConstants';

export const getNowPlayingMovies = () => {
  return axios.get(getNowPlayingMoviesUrl(API_KEY));
};

export const getGenresList = () => {
  return axios.get(getGenreListUrl(API_KEY));
};

export const getMoviesList = (year, genreList, page = 1) => {
  return axios.get(getMovieListUrl(API_KEY, year, genreList, page));
};

export const getMovieDetails = (movieId) => {
  return axios.get(getMovieDetailsUrl(API_KEY, movieId));
};
