export const API_KEY = process.env.API_KEY;
export const CURRENT_YEAR = new Date().getFullYear();

export const getGenreListUrl = (apiKey) =>
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

export const getMovieListUrl = (apiKey, year, genreList, page = 1) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_year=${year}&with_genres=${genreList}&with_original_language=en`;

export const getMovieDetailsUrl = (apiKey, movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

export const getNowPlayingMoviesUrl = (apiKey) =>
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

export const getComingSoonMoviesUrl = (apiKey) =>
  `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

export const getPopularMoviesUrl = (apiKey) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}language=en-US&page=1`;
