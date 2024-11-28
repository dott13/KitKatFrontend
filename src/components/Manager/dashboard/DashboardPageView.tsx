import React, {useEffect} from "react";
import OnBenchStatCard from "./OnBenchStatCard";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store/configureStore.tsx";
import {getUsersOnBenchCount} from "../../../redux/userSlice/userSlice.tsx";
import PieChartCard from "./PieChartCard.tsx";
import LineGraphCard from "./LineGraphCard.tsx";


const DashboardPageView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.user.count);

  useEffect(() => {
    dispatch(getUsersOnBenchCount());
  }, [dispatch]);

  return (
    <div className='grid grid-cols-3 grid-rows-4 gap-x-8 mx-[7%] my-[5%]'>
      <div className="col-span-1 row-span-1">
        <OnBenchStatCard
          count={count}
          icon={"bench"}
          warning={"circle"}
          title={"on Bench"}
          description={"High number of employees on bench"}
        />
      </div>

      <div className="col-span-1 row-span-1">

      <OnBenchStatCard
          count={"15 d"}
          icon={"clock"}
          warning={"octagon"}
          title={"average time of waiting"}
          description={"High number of employees on bench"}
        />
      </div>
        <div className="col-span-1 row-span-1">

        <OnBenchStatCard
          count={"3"}
          icon={"map"}
          warning={"triangle"}
          title={"on Bench in UK"}
          description={"High number of employees on bench"}
        />
        </div>

      <div className="col-span-1 row-span-2">
      <PieChartCard/>
      </div>

      <div className='col-span-2 row-span-2'>
        <LineGraphCard/>
      </div>

    </div>
  );
};

export default DashboardPageView;
