import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (e) {
        setError("Failed to fetch trending movies");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trending Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
