import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './MovieCard.scss';

const fetchMoviesAPI = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc',
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
      }
    }
  );

  const data = await response.json();

  return data.results.map(movie => ({
    ...movie,
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '', 
    overview: movie.overview?.trim() || '제공되는 영화 정보가 없습니다'
  }));
};


const IndividualMovieCard = ({ movie }) => {
  const { title, posterUrl, vote_average, id } = movie;

  return (
    <Link to={`/detail/${id}`} className="movie-card-link">
      <div className="movie-card">
        <img
          src={posterUrl}
          alt={`${title} 포스터`}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
         <p className="rating">평점: {movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
};

const MovieCard = () => {
  const { searchQuery } = useOutletContext();  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieData = await fetchMoviesAPI();
        setMovies(movieData);
      } catch (err) {
        setError('데이터 로드 실패');
      }
      setLoading(false);
    };
    loadMovies();
  }, []);

  
  const filteredMovies = movies.filter(movie =>
    (movie.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) 
  ); 

  if (loading) return <h1 className="loading-message">로드 중...</h1>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-container">
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <IndividualMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
