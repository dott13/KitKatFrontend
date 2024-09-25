import React, { useEffect } from "react";
import bench_back from "../../../assets/svgs/bench-back.svg";
import { CiWarning } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/configureStore";
import { useSelector } from "react-redux";
import { getUsersOnBenchCount } from "../../../redux/userSlice/userSlice";

const OnBenchStatCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.user.count);

  useEffect(() => {
    dispatch(getUsersOnBenchCount());
  }, [dispatch]);
  return (
    <div className="relative w-[24vw] h-[18vh] mx-8 my-12 bg-white border border-gray-200 shadow-md rounded-lg">
      <div className="flex justify-between h-full px-4">
        <div className="absolute -top-8 left-5 w-[5rem] h-[5rem] bg-filters rounded flex justify-center items-center shadow-lg">
          <img src={bench_back} alt="bench" className="h-18 w-18 p-4" />
        </div>
        <div className="flex flex-col flex-grow text-right">
          <p className="text-widget font-thin text-base mt-2 ">on Bench</p>
          <span className="text-black text-2xl font-medium ">{count}</span>
          <hr className="border-t-2 border-widget mt-6 " />

          <div className="flex items-center mt-1 ml-4">
            <CiWarning className="text-black text-lg mr-2" size="24px" />
            <p className="text-widget font-regular text-xs">
              High number of employees on bench
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBenchStatCard;
