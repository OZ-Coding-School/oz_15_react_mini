import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.scss";

export default function Home({ movies }) {
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
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard
                            id={movie.id}
                            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            title={movie.title}
                            rating={movie.vote_average}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}




