// ----- FILE PURPOSE ----->
// This module provides functions for interacting with the TMDB (The Movie Database) API,
// including fetching popular movies/TV series and searching for media content.

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// ----- GENERIC FETCH FUNCTION ----->
// A helper function to call the TMDB API with a given endpoint and query parameters.
// Throws an error if the response is not successful.
const fetchFromTMDB = async (endpoint, queryParams = '') => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&${queryParams}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('TMDB API error');
  return response.json();
};

// ----- FETCH POPULAR MOVIES ----->
// Fetches a list of currently popular movies from TMDB.
export const getPopularMovies = async () => {
  return fetchFromTMDB('/movie/popular');
};

// ----- FETCH POPULAR TV SERIES ----->
// Fetches a list of currently popular TV series from TMDB.
export const getPopularSeries = async () => {
  return fetchFromTMDB('/tv/popular');
};

// ----- SEARCH MEDIA (MOVIE OR TV) ----->
// Searches TMDB for movies or TV series based on a search query and media type.
export const searchMedia = async (query, type = 'movie') => {
  const endpoint = type === 'tv' ? '/search/tv' : '/search/movie';
  return fetchFromTMDB(endpoint, `query=${encodeURIComponent(query)}`);
};
