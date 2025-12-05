import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.scss";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);  /* 1 */

    useEffect(() => {  /* 2 */
        const fetchMovies = async () => {
            try {
                const response = await fetch(  /* 3 */
                    "https://api.themoviedb.org/3/movie/popular?language=ko",
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,  /* 4 */
                        },
                    }
                );

                const data = await response.json(); /* 5 */

                // 🔥 adult 영화 제외
                const filteredMovies = data.results.filter(movie => !movie.adult);

                setMovies(filteredMovies);
            } catch (error) {
                console.error("❌ 영화 목록 불러오기 실패:", error);
            } finally {
                setLoading(false);  /* 6 */
            }
        };

        fetchMovies();
    }, []);

    // ⏳ 로딩 상태 -> Skeleton UI 렌더링
    if (loading) {
        return (
            <div className="home">
                <h1>🎬 Movie List</h1>
                <div className="skeleton-grid">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="skeleton-card" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="home">
            <h1>🎬 Movie List</h1>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
            >
                {movies.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard
                            id={movie.id}
                            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            title={movie.title}
                            rating={movie.vote_average.toFixed(1)}
                        />
                    </SwiperSlide> /* 8 */
                ))}
            </Swiper>
        </div>
    );
}

