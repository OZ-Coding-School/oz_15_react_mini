import "./App.css";
import { Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { lazy, Suspense, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const HomePage = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./common/Layout"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));

function App() {
  const [isLogin, setIsLogin] = useState(false);
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
          <Route
            path="/"
            element={<Layout isLogin={isLogin} setIsLogin={setIsLogin} />}
          >
            <Route index element={<HomePage />} />
            <Route path={"/detail/:movie_Id"} element={<MovieDetail />} />
            <Route
              path={"/login"}
              element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
            />
            <Route path={"/signup"} element={<Signup />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
