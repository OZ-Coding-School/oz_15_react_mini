import { Link } from "react-router-dom";
const SearchMovieCard = ({ id, poster, title }) => {
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";
  const imageUrl = BASE_IMG_URL + poster;

  return (
    <>
      <div className=" w-[150px] h-56 border border-[1px solid black] m-3">
        <Link to={`/detail/${id}`}>
          <img src={imageUrl} alt={title} className="w-full h-full" />
        </Link>
      </div>
    </>
  );
};

export default SearchMovieCard;
