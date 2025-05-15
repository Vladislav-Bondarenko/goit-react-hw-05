import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Outlet,
  NavLink,
} from "react-router-dom";
import { getMovieDetails } from "../../api/tmdb";
import styles from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch details"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.goback}
        type="button"
        onClick={() => navigate(backLink.current)}
      >
        ← Go back
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {movie && (
        <>
          <div className={styles.flex}>
            <img
              className={styles.poster}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
            />
            <div className={styles.info}>
              <h2 className={styles.title}>{movie.title}</h2>
              <div className={styles.score}>
                User Score: {movie.vote_average}
              </div>
              <div className={styles.section}>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
              <div>
                <h3>Genres</h3>
                <ul className={styles.genres}>
                  {movie.genres?.map((g) => (
                    <li className={styles.genre} key={g.id}>
                      {g.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.tabs}>
            <NavLink
              to="cast"
              className={({ isActive }) =>
                isActive
                  ? `${styles.tablink} ${styles.tablinkActive}`
                  : styles.tablink
              }
            >
              Cast
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive
                  ? `${styles.tablink} ${styles.tablinkActive}`
                  : styles.tablink
              }
            >
              Reviews
            </NavLink>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}
