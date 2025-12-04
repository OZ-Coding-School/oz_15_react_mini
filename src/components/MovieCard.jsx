import { Link } from "react-router-dom";
import "./MovieCard.scss";

export default function MovieCard({ id, poster, title, rating }) {
    return (
        <Link to={"/detail"}>
            <div className="movie-card">
                <img src={poster} alt={title} />
                <h3>{title}</h3>
                <p>⭐ {rating}</p>
            </div>
        </Link>
    );
}




