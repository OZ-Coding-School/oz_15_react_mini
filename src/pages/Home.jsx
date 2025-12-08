import { useEffect, useState } from "react";  /* 1 */
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.scss";

export default function Home() {
    const [loading, setLoading] = useState(true);  /* 1 */

    useEffect(() => {  /* 2 */
        const fetchMovies = async () => {
            try {
                const response = await fetch(  /* 3 */
                    "https://api.themoviedb.org/3/movie/popular?language=ko",
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`, /* 4 */
                        },
                    }
                );  

                const data = await response.json();  /* 5 */

                const filteredMovies = data.results.filter(movie => !movie.adult);  /*  adult=false만 필터링  */

                setMovies(filteredMovies); /* 6 */
                setLoading(false); /* */
            } catch (error) {
                console.error("❌ 영화 목록 로딩 실패:", error);
            }
        };
fetchMovieData();
    }, []);

    /* 로딩중 */
    if (loading) return <h2>⏳ 인기 영화 불러오는 중...</h2>;

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
                {movies.map((movie) => (  /* 8 */
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

