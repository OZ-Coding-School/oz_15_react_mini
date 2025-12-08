import { Link } from "react-router-dom";
import "./MovieCard.scss";

export default function MovieCard({ id, poster, title, rating }) {
  return (
    <Link to={`/movie/${id}`} className="movie-link">
      <div className="movie-card">
        <img src={poster} alt={title} />
        <h3 className="movie-card-title">{title}</h3>
        <p className="rating">⭐ {rating}</p>
      </div>
    </Link>
  );
}
