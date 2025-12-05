import "./App.css";
import { Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./common/Layout"));
const MovieDetail = lazy(() => import("./components/MovieDetail"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full m-50">
            <div className="w-50 h-50 border-40 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={"/detail/:movie_Id"} element={<MovieDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
