import { useEffect, useState } from "react";   /* 1 */
import { useParams } from "react-router-dom";
import "./MovieDetail.scss";

export default function MovieDetail() {
    const { id } = useParams();  /*  2  */

    const [movie, setMovie] = useState(null);  /* 3 */
    const [loading, setLoading] = useState(true);  /* 도전과제 추가 */
<<<<<<< HEAD
=======

    console.log("TOKEN:", import.meta.env.VITE_TMDB_ACCESS_TOKEN);

    useEffect(() => {   /*4 */
        const fetchMovieDetail = async () => {
            try {
                const response = await fetch(   /* 5 */
                    `https://api.themoviedb.org/3/movie/${id}?language=ko`,
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
                        },
                    }
                );  /* */

                const data = await response.json();  /*  6 */
                setMovie(data);
                setLoading(false);

            } catch (error) {
                console.error("❌ 영화 상세 데이터를 불러오는 중 오류:", error);
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return <h2>⏳ 영화 정보를 불러오는 중...</h2>;  /*  7  */
    if (!movie) return <h2>❌ 영화 정보를 불러올 수 없습니다.</h2>;
>>>>>>> 8384b0b6e75bdbd4523edaefe3b9764d9903992b

    console.log("TOKEN:", import.meta.env.VITE_TMDB_ACCESS_TOKEN);

    useEffect(() => {   /*4 */
        const fetchMovieDetail = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?language=ko`,
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
                        },
                    }
                );  /* */

                const data = await response.json();
                setMovie(data);
                setLoading(false);

            } catch (error) {   /*  알아두기  */
                console.error("❌ 영화 상세 데이터를 불러오는 중 오류:", error);
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return <h2>⏳ 영화 정보를 불러오는 중...</h2>;  /*  5  */
    if (!movie) return <h2>❌ 영화 정보를 불러올 수 없습니다.</h2>;  /* 6 */

    return (  /* 7  */
        <div className="detail-container">
            <img
                className="detail-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <div className="detail-info">
                <h2>{movie.title}</h2>
                <p>⭐ {movie.vote_average}</p>

                <h3>장르</h3>
                <div className="genres">
                    {movie.genres?.map((g) => (
                        <span key={g.id} className="genre-tag">
                            {g.name}
                        </span>
                    ))}
                </div>

                <h3>줄거리</h3>
                <p className="overview">{movie.overview}</p>
            </div>
        </div>
    );
}
