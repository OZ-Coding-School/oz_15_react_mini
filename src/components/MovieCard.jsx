import { Link } from "react-router-dom";
const MovieCard = ({ id, poster, title, rating }) => {
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";
  const imageUrl = BASE_IMG_URL + poster;

  return (
    <>
      <div className=" w-[150px] h-[300px] border border-[1px solid black] ">
        <Link to={`/detail/${id}`}>
          <img src={imageUrl} alt={title} className="h-[80%]" />
          <hr />
          <div>
            <p className="text-sm">{title}</p>
            <hr />
            <p className="text-sm">평점 : {rating}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
