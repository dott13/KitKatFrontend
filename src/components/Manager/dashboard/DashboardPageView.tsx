import React from "react";
import Header from "../../Header.tsx";
import SideBar from "../../SideBar.tsx";

const DashboardPageView: React.FC = () => {
  return (
    <div>
      <Header/>
      <SideBar/>
      <h1 className="text-black">Welcome to the Dashboard)</h1>
      <p className="text-black">in development...</p>
    </div>
  );
};

export default DashboardPageView;
