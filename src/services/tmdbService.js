const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Grunnleggende fetch-funksjon med feilhåndtering
const fetchFromTMDB = async (endpoint, queryParams = '') => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&${queryParams}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('TMDB API error');
  return response.json();
};

export const getPopularMovies = async () => {
  return fetchFromTMDB('/movie/popular');
};

export const getPopularSeries = async () => {
  return fetchFromTMDB('/tv/popular');
};

export const searchMedia = async (query, type = 'movie') => {
  const endpoint = type === 'tv' ? '/search/tv' : '/search/movie';
  return fetchFromTMDB(endpoint, `query=${encodeURIComponent(query)}`);
};
