import { useNavigate } from "react-router-dom";  /* 1 */
import "./MovieCard.scss";

export default function MovieCard({ id, poster, title, rating }) {  /* 2 */
    const navigate = useNavigate();  /* 3  */
<<<<<<< HEAD

    const handleClick = () => {  /* 4 */
        navigate(`/movie/${id}`);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
=======
  
    const handleClick = () => {
        navigate(`/movie/${id}`);  /* 1 */
    };

    return (
        <div className="movie-card" onClick={handleClick}>   
>>>>>>> 8384b0b6e75bdbd4523edaefe3b9764d9903992b
            <img
                src={poster || "https://via.placeholder.com/300x450?text=No+Image"}
                alt={title}
                className="poster"
<<<<<<< HEAD
            />
            <h3>{title}</h3>
            <p>⭐ {rating}</p>
=======
                />
            <h3>{title}</h3>
            <p>⭐ {rating.toFixed(1)}</p>
>>>>>>> 8384b0b6e75bdbd4523edaefe3b9764d9903992b
        </div>
    );
}





