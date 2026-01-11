/**
 * @file axios.js
 * @brief Axios instance configuration for the TMDB API.
 *
 * This file creates and configures a reusable Axios instance with a predefined
 * base URL for all requests to The Movie Database (TMDB) API. This architectural
 * pattern centralizes API configuration, making it easier to manage and update.
 * Using a dedicated instance avoids repeating the base URL in every API call.
 */
import axios from "axios";

/**
 * An Axios instance pre-configured with the base URL for the TMDB API (v3).
 * All API requests made through this instance will be relative to this URL.
 * For example: `instance.get('/movie/popular')` will make a request to
 * `https://api.themoviedb.org/3/movie/popular`.
 */
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
