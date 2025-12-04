import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import movieList from "./data/movieListData.json";
import movieDetail from "./data/movieDetailData.json";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

export default function App() {
  const [movies] = useState(movieList.results);
  const [movieDetails] = useState(movieDetail);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home movies={movies} />} />
        <Route path="detail" element={<MovieDetail movie={movieDetails} />} />
      </Route>
    </Routes>
  );
}







