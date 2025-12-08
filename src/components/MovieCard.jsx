import { Link } from "react-router-dom";
const MovieCard = ({ id, poster, title, rating }) => {
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";
  const imageUrl = BASE_IMG_URL + poster;

  return (
    <>
      <div className=" w-[180px] h-[300px] border border-[1px solid black] rounded-2xl">
        <Link to={`/detail/${id}`}>
          <p className="absolute text-sm  w-[50px] rounded-[10px] bg-black text-white m-1 ">
            ⭐{Math.floor(rating * 10) / 10}
          </p>
          <img src={imageUrl} alt={title} className="h-[90%] rounded-t-2xl" />
          <div className="overflow-hidden h-[10%] bg-gray-400 rounded-b-2xl">
            <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-center pt-1">
              <strong> {title}</strong>
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
