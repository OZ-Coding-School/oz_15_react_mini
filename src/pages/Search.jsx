import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./Search.scss"; // 🔥 스타일 분리

export default function Search() {
  const [params] = useSearchParams();
  const keyword = params.get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!keyword?.trim()) return;

    async function fetchSearch() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${keyword}&language=ko`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
          }
        );

        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("❌ 검색 실패:", err);
      }
    }

    fetchSearch();
  }, [keyword]);

  return (
    <div className="search-container">
      <h2 className="search-title">🔍 검색 결과: <span>{keyword}</span></h2>

      {results.length === 0 ? (
        <p className="no-result">검색 결과가 없습니다 🖤🥺</p>
      ) : (
        <div className="search-grid">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average?.toFixed(1) || "?"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
