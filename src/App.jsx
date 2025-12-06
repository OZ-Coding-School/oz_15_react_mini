import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// 🔥 lazy 로딩 적용
const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));

export default function App() {
  return (
    <Suspense fallback={<h2>📦 페이지 불러오는 중...</h2>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
}










