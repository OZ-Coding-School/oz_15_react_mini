<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";  /* 1 */
>>>>>>> origin/mission-28384b0b6e75bdbd4523edaefe3b9764d9903992b
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.scss";

export default function Home() {
<<<<<<< HEADes, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);  /* 1 */

    useEffect(() => {  /* 2 */
        const fetchMovies = async () => {
=======
    const [movies, setMovies] = useState([]); /* 1 */
    const [loading, setLoading] = useState(true); 

    useEffect(() => { /* 2 */
        const fetchMovieData = async () => { /* 3 */
>>>>>>> 8384b0b6e75bdbd4523edaefe3b9764d9903992b
            try {
                const response = await fetch(  /* 3 */
                    "https://api.themoviedb.org/3/movie/popular?language=ko",
                    {
                        headers: {
                            accept: "application/json",
<<<<<<< HEAD
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
=======
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
>>>>>>> 8384b0b6e75bdbd4523edaefe3b9764d9903992b

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
<<<<<<< HEAD
                {movies.map(movie => (
=======
                {movies.map((movie) => (  /* 8 */
>>>>>>> 8384b0b6e75bdbd4523edaefe3b9764d9903992b
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

