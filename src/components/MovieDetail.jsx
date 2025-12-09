import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.scss';

const fetchMovieDetailAPI = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  return {
    ...data,
    posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    overview: data.overview?.trim() || '제공되는 줄거리가 없습니다',
  };
};

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        const movieData = await fetchMovieDetailAPI(id);
        setMovie(movieData);

        const savedList = JSON.parse(localStorage.getItem('myList')) || [];
        setIsLiked(savedList.some(item => item.id === movieData.id));
      } catch (err) {
        setError('영화 정보를 불러오는 데 실패했습니다');
      }
      setLoading(false);
    };
    loadMovieDetail();
  }, [id]);

  const handleToggleMyList = () => {
    let savedList = JSON.parse(localStorage.getItem('myList')) || [];

    if (isLiked) {
      savedList = savedList.filter(item => item.id !== movie.id);
      setIsLiked(false);
    } else {
      savedList.push({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
      });
      setIsLiked(true);
    }

    localStorage.setItem('myList', JSON.stringify(savedList));
  };

  if (loading) return <h1 className="loading-message">로드 중...</h1>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="movie-detail">
      <div className="poster">
        <img src={movie.posterUrl} alt={movie.title} />
      </div>

      <div className="info">
        <div className="top-row">
          <div className="title-and-like">
            <h2>{movie.title}</h2>

            <button
              className={`add-mylist ${isLiked ? 'liked' : ''}`}
              onClick={handleToggleMyList}
            >
              <img src="/icons/add-to-list.svg" alt="찜하기" />
            </button>
          </div>

          <div className="rating">
            평점: {movie.vote_average?.toFixed(1) || 'N/A'}
          </div>
        </div>

        <div className="genres">
          {movie.genres?.map((genre) => (
            <span key={genre.id} className="genre-tag">
              {genre.name}
            </span>
          ))}
        </div>

        <div className="overview-title">줄거리</div>
        <div className="overview">{movie.overview}</div>
      </div>
    </div>
  );
}

export default MovieDetail;
