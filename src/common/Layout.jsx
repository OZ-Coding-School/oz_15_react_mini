import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ isLogin, setIsLogin }) => {
  return (
    <div className="flex flex-col">
      <NavBar isLogin={isLogin} setIsLogin={setIsLogin} />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
