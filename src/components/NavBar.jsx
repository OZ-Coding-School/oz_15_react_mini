import { useState, useEffect } from "react";
import {
  useSearchParams,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useDebounce from "../hooks/useDebounce";
import NavButton from "./NavButton";

function NavBar() {
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearchText = useDebounce(searchText, 200);
  const navigate = useNavigate();
  const location = useLocation();

  const{user, signOut} = useAuth();

  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setSearchText(initialQuery);
  }, []);

  useEffect(() => {
    if (!debouncedSearchText) {
      setSearchParams({});
    } else {
      setSearchParams({ query: debouncedSearchText });
    }
  }, [debouncedSearchText, setSearchParams]);

  const handleLogoClick = () => {
    setSearchText("");
    setSearchParams({});
    navigate("/");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="nav_title">
        <Link to="/" onClick={handleLogoClick}>
          🍿Munching Movies
        </Link>
      </h1>

      <div className="nav_search">
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          className="nav_search-input"
          value={searchText}
          onChange={(e) => {
            const value = e.target.value;
            setSearchText(value);

            if (location.pathname !== "/") {
              navigate("/");
            }
          }}
        />
      </div>

      <div className="nav_buttons">
        {!user ? (
          <>
            <NavButton to="/login" className="nav_login-btn">
            로그인
            </NavButton>
            <NavButton to="/signup" className="nav_signup-btn">
            회원가입
            </NavButton>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs">{user.email}</span>
            <button onClick={handleLogout} className="nav_signup-btn">
            로그아웃
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
