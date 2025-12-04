import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h2>🎬 My Movie App</h2>

      {/* 🔍 검색창 추가 */}
      <input type="text" placeholder="영화 검색..." className="search-input" />

      <div className="nav-buttons">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}
