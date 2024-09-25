import React from "react";
import OnBenchStatCard from "./OnBenchStatCard";

const DashboardPageView: React.FC = () => {
  return (
    <div>
      <div className="mx-10 my-8">
        <OnBenchStatCard />
      </div>
      <h1 className=" text-black ">in development</h1>
    </div>
  );
};

export default DashboardPageView;
