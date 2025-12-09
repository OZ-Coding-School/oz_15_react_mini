import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBarStyle.scss';

function NavBar({ onSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {  
    const value = e.target.value;
    setSearchText(value);
    onSearch(value); 
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>NETFLIX</h1>
        </Link>
      </div>

      <div className="menu">
        <Link to="/" className="menu-item">홈</Link>
        <Link to="/movies" className="menu-item">영화</Link>
        <Link to="/series" className="menu-item">시리즈</Link>
        <Link to="/mylist" className="menu-item">내가 찜한 콘텐츠</Link>
      </div>

      <div className="auth-buttons">
        <button 
          className="search-button"
          onClick={() => setSearchOpen(!searchOpen)}
        />
        <Link to="/login" className="auth-button login">로그인</Link>
        <Link to="/signup" className="auth-button signup">회원가입</Link>

        <div className={`search-box ${searchOpen ? 'active' : ''}`}>
          <input 
            type="text" 
            placeholder="제목을 입력하세요"
            autoFocus
            value={searchText}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

