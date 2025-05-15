import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb";

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
  if (!reviews.length) return <p>No reviews found.</p>;

  return (
    <ul>
      {reviews.map((r) => (
        <li key={r.id}>
          <b>Author: {r.author}</b>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
