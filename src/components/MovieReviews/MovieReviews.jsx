import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch reviews"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!reviews.length)
    return <div className={styles.empty}>No reviews found.</div>;

  return (
    <ul className={styles.list}>
      {reviews.map((r) => (
        <li className={styles.item} key={r.id}>
          <div className={styles.author}>Author: {r.author}</div>
          <p className={styles.content}>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
