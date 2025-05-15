import styles from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li className={styles.item} key={movie.id}>
          <Link
            className={styles.link}
            to={`/movies/${movie.id}`}
            state={{ from: location }}
          >
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
