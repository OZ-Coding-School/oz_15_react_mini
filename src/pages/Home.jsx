import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const apiToken = import.meta.env.VITE_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };
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
  console.log(movies);
  return (
    <>
      <Swiper className="m-10" spaceBetween={50} slidesPerView={7}>
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
      <div className="grid grid-cols-5 gap-5 p-5">
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
