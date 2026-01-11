/**
 * @file requests.js
 * @brief Centralized configuration for all TMDB API endpoints used in the application.
 *
 * This file consolidates all the API request URLs into a single, easily manageable object.
 * It retrieves the TMDB API key from the environment variables and constructs the full
 * request strings for various categories, such as trending, genres, and Netflix Originals.
 * This approach promotes code reuse and simplifies maintenance.
 */

// Retrieve the TMDB API key from Vite's environment variables.
// IMPORTANT: Ensure VITE_TMDB_API_KEY is defined in your .env.local file.
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

// The base URL for all v3 TMDB API endpoints.
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Base URLs for constructing image paths from TMDB.
 * `IMAGE_BASE_URL` is for full-sized, original quality backdrops.
 * `POSTER_BASE_URL` is for standard w500 posters.
 */
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * A comprehensive object containing all the API endpoints required by the app.
 * Each key represents a specific row or data fetch, and its value is the complete
 * URL for that request.
 */
const requests = {
    // General-purpose fetches
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    
    // Movie genres
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchAdventure: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=12`,
    fetchSciFi: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`,
    fetchThriller: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53`,
    fetchAnimation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchFamily: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751`,
    fetchDrama: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18`,
};

export default requests;
