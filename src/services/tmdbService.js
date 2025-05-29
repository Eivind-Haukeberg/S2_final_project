const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Grunnleggende fetch-funksjon med feilhåndtering
const fetchFromTMDB = async (endpoint, queryParams = '') => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&${queryParams}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('TMDB API error');
  return response.json();
};

export const searchMovies = async (query) => {
  return fetchFromTMDB('/search/movie', `query=${encodeURIComponent(query)}`);
};

export const searchSeries = async (query) => {
  return fetchFromTMDB('/search/tv', `query=${encodeURIComponent(query)}`);
};

export const getPopularMovies = async () => {
  return fetchFromTMDB('/movie/popular');
};

export const getPopularSeries = async () => {
  return fetchFromTMDB('/tv/popular');
};
