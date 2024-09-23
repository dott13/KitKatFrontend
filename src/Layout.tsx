import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar.tsx";
import Header from "./components/Header.tsx";


const Layout: React.FC = () => {
  return (
    <div className="h-screen flex">
      <SideBar />
      <div className="flex-grow">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
