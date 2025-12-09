import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const fetchSeriesAPI = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1',
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
      }
    }
  );
  const data = await response.json();
  return data.results.map(series => ({
    id: series.id,
    title: series.name,
    posterUrl: `https://image.tmdb.org/t/p/w500${series.poster_path}`
  }));
};

function Series() {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSeries = async () => {
      const data = await fetchSeriesAPI();
      setSeriesList(data);
      setLoading(false);
    };
    loadSeries();
  }, []);

  if (loading) return <h2 className="loading-message">로딩 중...</h2>;

  return (
    <div className="list-container">
      <div className="movie-list">
        {seriesList.map(series => (
          <Link to={`/detail/${series.id}`} key={series.id} className="movie-card-link">
            <div className="movie-card">
              <img src={series.posterUrl} alt={series.title} />
              <h3>{series.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Series;
