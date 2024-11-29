import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/layout/SideBar.tsx";
import Header from "./components/layout/Header.tsx";

interface LayoutState {
  role: "ROLE_MANAGER"| "ROLE_USER" | "ROLE_ADMIN"|null
}

const Layout: React.FC<LayoutState> = ({role}) => {
  return (
    <div className="h-screen flex flex-col">
      <SideBar role={role}/>
      <Header />
      <main className="ml-[20%] mt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
