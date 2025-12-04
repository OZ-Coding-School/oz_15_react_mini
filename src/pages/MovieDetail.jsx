import { useParams } from "react-router-dom";
import "./MovieDetail.scss";

export default function MovieDetail({ movie }) {

    if (!movie) return <h2>😢 영화 정보를 찾을 수 없습니다.</h2>;

    return (
        <div className="detail-container">
            <img
                className="detail-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <div className="detail-info">
                <h2>{movie.title}</h2>
                <p>⭐ {movie.vote_average}</p>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
}
