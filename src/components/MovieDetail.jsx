import { useEffect, useState } from "react";
import movieDetailData from "../data/movieDetailData.json";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movie_Id } = useParams();
  const [movie, setMovie] = useState([]);
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";
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
      `https://api.themoviedb.org/3/movie/${movie_Id}?language=ko-KR`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((err) => console.error(err));
  }, [movie_Id]);

  if (!movie || !movie.genres)
    return (
      <div className="flex justify-center items-center text-[150px] pt-[50px]">
        정보 가져오는중...
      </div>
    );

  const imageUrl =
    BASE_IMG_URL +
    (movie.belongs_to_collection?.poster_path || movie.backdrop_path);

  return (
    <div className="flex items-center justify-center pt-10">
      <div>
        <img src={imageUrl} alt={movie.title} className="h-[400px]" />
      </div>
      <div className="w-[700px] p-5">
        <div className="flex gap-5 pb-5 ">
          <p className="flex justify-center border p-3 w-[450px] h-[50px]">
            {movie.title}
          </p>
          <p className="flex justify-center border p-3 w-[200px] ">
            {movie.vote_average}
          </p>
        </div>
        <div className=" flex justify-center border p-5 mb-5">
          {movie.genres.map((el) => el.name).join(",")}
        </div>
        <div className="flex border p-5 gap-5 justify-center items-center">
          {movie.overview ? movie.overview : "정보가 없습니다"}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
