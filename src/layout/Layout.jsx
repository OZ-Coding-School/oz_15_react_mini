import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";

export default function Layout() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="layout-container">
      <NavBar onSearch={setSearchValue} />

      {/* 🔥 Search 페이지에 searchValue 전달 */}
      <Outlet context={{ searchValue }} />
    </div>
  );
}
