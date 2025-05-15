import styles from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearchForm from "../../components/MovieSearchForm/MovieSearchForm";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    async function fetchData() {
      try {
        setLoading(true);
        const data = await searchMovies(query);
        setMovies(data);
      } catch (e) {
        setError("Failed to search movies");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query]);

  const handleSearch = (value) => setSearchParams({ query: value });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Search Movies</h1>
      <MovieSearchForm onSubmit={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
