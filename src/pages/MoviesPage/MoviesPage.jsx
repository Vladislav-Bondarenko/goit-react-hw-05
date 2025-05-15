import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearchForm from "../../components/MovieSearchForm/MovieSearchForm";
import { searchMovies } from "../../api/tmdb";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch movies"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [query]);

  const handleSearch = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <MovieSearchForm onSubmit={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
