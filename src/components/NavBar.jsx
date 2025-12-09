import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import "./NavBar.scss";

export default function NavBar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // 0.6초후 검색 창으로 이동 
  const debouncedValue = useDebounce(searchValue, 600);

  // 입력 후 자동 검색 
  useEffect(() => {
    if (!debouncedValue.trim()) return;
    navigate(`/search?query=${debouncedValue}`);
  }, [debouncedValue, navigate]);

  // 엔터 검색도 유지
  const handleSearchKey = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/search?query=${searchValue}`);
    }
  };

  return (
    <nav className="navbar">

      <h2 className="nav-logo" onClick={() => navigate("/")}>
        🎀 Sweet Nightmare Movies
      </h2>

      <input
        className="search-input"
        type="text"
        placeholder="영화를 검색하세요 🔍"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSearchKey}
      />

      <div className="nav-buttons">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}
