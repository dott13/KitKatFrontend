import React, {useEffect} from "react";
import OnBenchStatCard from "./OnBenchStatCard";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store/configureStore.tsx";
import {getUsersOnBenchCount} from "../../../redux/userSlice/userSlice.tsx";


const DashboardPageView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.user.count);

  useEffect(() => {
    dispatch(getUsersOnBenchCount());
  }, [dispatch]);

  return (
    <div>
      <div className="mx-10 my-8 flex flex-row items-start">
        <OnBenchStatCard
          count={count}
          icon={"bench"}
          warning={"circle"}
          title={"on Bench"}
          description={"High number of employees on bench"}
        />
        <OnBenchStatCard
          count={"15 d"}
          icon={"clock"}
          warning={"octagon"}
          title={"average time of waiting"}
          description={"High number of employees on bench"}
        />
        <OnBenchStatCard
          count={"3"}
          icon={"map"}
          warning={"triangle"}
          title={"on Bench in UK"}
          description={"High number of employees on bench"}
        />
      </div>


      <h1 className=" text-black ">in development</h1>
    </div>
  );
};

export default DashboardPageView;
