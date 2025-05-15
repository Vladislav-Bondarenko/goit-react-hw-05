import { useState } from "react";
import styles from "./MovieSearchForm.module.css";

export default function MovieSearchForm({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search movies..."
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
