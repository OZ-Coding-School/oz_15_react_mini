import { useEffect, useState } from "react";
import useDebounce from "../Customhook/debounce";
import options from "../constants";
import SearchMovieCard from "../components/SearchMovieCard";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [searchDebounced, setSearchDebounced] = useState("");
  const debounced = useDebounce(searchDebounced, 300);

  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debounced) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${debounced}&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setSearchResults([]);
      });
  }, [debounced]);

  const searchInputChange = (event) => {
    setSearchDebounced(event.target.value);
  };

  return (
    <nav className="bg-gray-800 p-4 relative ">
      <div className="container  mx-auto  flex flex-col md:flex-row xl:flex-row justify-between items-center">
        <Link to={"/"}>
          <h1 className="text-white text-2xl">OZ영화관</h1>
        </Link>
        <div className="relative w-[400px] md:w-[350px] xl:w-[700px] p-2">
          <input
            type="text"
            value={searchDebounced}
            onChange={searchInputChange}
            className="flex bg-white rounded-[20px] h-8 w-full px-4 "
          />

          {searchDebounced && (searchResults.length > 0 || loading) && (
            <div
              className="absolute top-full left-0 mt-1 w-full bg-white border 
            border-gray-300 rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto"
            >
              {loading && <div className="p-4 text-gray-600">검색 중...</div>}

              {!loading && searchResults.length > 0 && (
                <div className="grid grid-cols-2 xl:grid-cols-4">
                  {searchResults.slice(0, 4).map((movie) => (
                    <SearchMovieCard
                      key={movie.id}
                      id={movie.id}
                      poster={movie.poster_path}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex w-[250px] justify-between">
          <button className="text-white bg-purple-800 rounded-[5px] w-30 h-10">
            로그인
          </button>
          <button className="text-white bg-purple-800 rounded-[5px] w-30 h-10 ">
            회원가입
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
