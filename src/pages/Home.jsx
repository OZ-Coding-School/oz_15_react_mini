import "./Home.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "../components/MovieCard";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";


export default function Home({ movies }) {
  return (
    <div className="home-container">
      <h2 className="section-title"> 🎟 인기 영화</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={18}
        slidesPerView={4}
        pagination={{ clickable: true }}
        navigation={true} 
        grabCursor={true}
      >
        {movies?.map((movie, index) => (
          <SwiperSlide
            key={movie.id}
            className={`slide-item ${index % 3 === 0 ? "big" : index % 3 === 1 ? "medium" : "small"}`}
          >
            <MovieCard
              id={movie.id}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average?.toFixed(1) || "?"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
