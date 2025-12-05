import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
