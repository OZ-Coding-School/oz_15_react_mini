import React, { useEffect, useState } from 'react';
import './HeroSection.scss';

const fetchFeaturedMovies = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
      }
    }
  );
  const data = await response.json();
  return data.results.slice(0, 5); 
};

function HeroSection() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      const featured = await fetchFeaturedMovies();
      setMovies(featured);
    };
    loadMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % movies.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length) return null;

  const currentMovie = movies[current];

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`
      }}
    >
      <div className="hero-overlay">
        <h1 className="hero-title">{currentMovie.title}</h1>
        <p className="hero-overview">{currentMovie.overview}</p>
      </div>
    </div>
  );
}

export default HeroSection;
