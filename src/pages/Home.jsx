import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { options } from "../constants";

function HomePage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results.filter((res) => res.adult === false));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="p-10">
        <Swiper
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },

            1280: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide>
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5 p-5 pl-15">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;
