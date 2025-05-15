import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/tmdb";
import styles from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch cast"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!cast.length) return <p>No cast information.</p>;

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li className={styles.item} key={actor.cast_id || actor.credit_id}>
          <img
            className={styles.avatar}
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : defaultImg
            }
            alt={actor.name}
          />
          <div className={styles.name}>{actor.name}</div>
          <div className={styles.char}>Character: {actor.character}</div>
        </li>
      ))}
    </ul>
  );
}
