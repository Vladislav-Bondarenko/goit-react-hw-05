import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function getTrendingMovies() {
  const response = await instance.get("/trending/movie/day");
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await instance.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return response.data.results;
}

export async function getMovieDetails(id) {
  const response = await instance.get(`/movie/${id}`);
  return response.data;
}

export async function getMovieCast(id) {
  const response = await instance.get(`/movie/${id}/credits`);
  return response.data.cast;
}

export async function getMovieReviews(id) {
  const response = await instance.get(`/movie/${id}/reviews`);
  return response.data.results;
}
