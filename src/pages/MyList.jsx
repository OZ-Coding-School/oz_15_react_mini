import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyList.scss';

function MyList() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('myList')) || [];
    setMyList(savedList);
  }, []);

if (myList.length === 0)
  return <h2 className="empty-message">찜한 콘텐츠가 없습니다</h2>;

  return (
    <div className="mylist-container">
      {myList.map(movie => (
        <Link to={`/detail/${movie.id}`} key={movie.id} className="movie-card-link">
          <div className="movie-card">
            <img src={movie.posterUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MyList;
