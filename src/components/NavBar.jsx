import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.scss";
import logo from "../assets/logo.png";
import NavButton from "./common/NavButton.jsx";
import { useSupabaseAuth } from "../supabase";

export default function NavBar({ searchQuery, onChangeSearchQuery }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useSupabaseAuth();   // Supabase에서 유저 상태 받기

  // ✅ supabase user + localStorage 둘 다 보고 로그인 여부 판단
  const isLoggedIn =
    !!user || localStorage.getItem("isLoggedIn") === "true";

  const handleChange = (e) => {
    if (typeof onChangeSearchQuery === "function") {
      onChangeSearchQuery(e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("검색", searchQuery);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();                       // Supabase 세션 정리
      localStorage.removeItem("isLoggedIn"); // UI용 로그인 상태 제거
      setIsMenuOpen(false);
      navigate("/");                        // 메인으로 이동
      window.location.reload();             // 필요 없으면 이 줄은 지워도 됨
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <nav className="nav">
      {/* 왼쪽: 로고 */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="logo" className="nav-logo-img" />
          <span className="nav-title">테레비-죤</span>
        </Link>
      </div>

      {/* 가운데: 검색창 */}
      <div className="nav-center">
        <input
          type="text"
          className="nav-search"
          placeholder="제목을 검색하세요."
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 오른쪽: 로그인/회원가입 or 마이페이지/로그아웃 + 링크들 */}
      <div className="nav-right">
        {/* 1) 로그인 안 된 상태: 로그인/회원가입 버튼 */}
        {!isLoggedIn && (
          <div className="nav-auth">
            <Link to="/login">
              <NavButton>로그인</NavButton>
            </Link>
            <Link to="/signup">
              <NavButton variant="primary">회원가입</NavButton>
            </Link>
          </div>
        )}

        {/* 2) 로그인 된 상태: 썸네일 + 드롭다운 메뉴 */}
        {isLoggedIn && (
          <div className="nav-user">
            <button
              type="button"
              className="nav-user-thumb-btn"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <img src={logo} alt="user" className="nav-user-thumb" />
            </button>

            {isMenuOpen && (
              <div className="nav-user-menu">
                <Link to="/mypage" className="nav-user-menu-item">
                  마이 페이지
                </Link>
                <button
                  type="button"
                  className="nav-user-menu-item logout"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}

        {/* 오른쪽 링크들 */}
        <div className="nav-links">
          <Link to="/" className="nav-link-item">
            <div className="nav-link-box">Home</div>
          </Link>
          <Link to="/watch-later" className="nav-link-item">
            <div className="nav-link-box">나중에 볼 영화</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}