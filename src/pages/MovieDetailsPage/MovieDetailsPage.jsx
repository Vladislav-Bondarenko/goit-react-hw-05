import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Outlet,
  NavLink,
} from "react-router-dom";
import { getMovieDetails } from "../../api/tmdb";

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
    <div>
      <button type="button" onClick={() => navigate(backLink.current)}>
        Go back
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movie && (
        <div>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
            }
            alt={movie.title}
            width={250}
          />
          <h2>{movie.title}</h2>
          <p>User Score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres?.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        </div>
      )}

      <hr />
      <nav>
        <NavLink to="cast" style={{ marginRight: 20 }}>
          Cast
        </NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
