import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/layout/SideBar.tsx";
import Header from "./components/layout/Header.tsx";


const Layout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <SideBar />
      <Header />
      <main className="ml-[20%] mt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
