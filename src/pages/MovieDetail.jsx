import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
          }
        );

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error("❌ 상세 정보 불러오기 오류:", err);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <p style={{ padding: "20px" }}>⏳ 불러오는 중...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <p>⭐ 평점: {movie.vote_average}</p>
      <p>📅 개봉일: {movie.release_date}</p>
      <p>📖 줄거리:</p>
      <p>{movie.overview || "줄거리 정보가 없습니다."}</p>
    </div>
  );
}
