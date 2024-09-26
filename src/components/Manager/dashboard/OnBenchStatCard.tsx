import React from "react";
import bench from "../../../assets/svgs/bench-back.svg";
import {MdAccessTimeFilled} from "react-icons/md";
import {FaMapMarkerAlt} from "react-icons/fa";
import {BiError, BiErrorAlt, BiErrorCircle} from "react-icons/bi";



interface OnBenchStatData {
  title: string;
  count: string | number |null;
  description: string;
  icon: "bench"|"clock"|"map";
  warning: "triangle"|"octagon"|"circle"
}

const OnBenchStatCard: React.FC<OnBenchStatData> = ({title, count, description, icon, warning}) => {
  const renderImage = ()=>{

      switch(icon){
        case "bench":
          return (<img src={bench} alt="bench" className="h-18 w-18 p-4"/>)
        case "clock":
          return (<MdAccessTimeFilled className="h-[40px] w-[40px]"/>)
        case "map":
          return (<FaMapMarkerAlt className="h-[40px] w-[40px]"/>)
        default:
          return (<img src={bench} alt="bench" className="h-18 w-18 p-4"/>)
      }

  }

  const renderWarning = ()=>{
    switch(warning){
      case "triangle":
        return (<BiError className="text-black text-lg mr-2" size="24px"/>)
      case "octagon":
        return (<BiErrorAlt className="text-black text-lg mr-2" size="24px"/>)
      case "circle":
        return (<BiErrorCircle className="text-black text-lg mr-2" size="24px"/>)
      default:
        return (<img src={bench} alt="bench" className="h-18 w-18 p-4"/>)
    }

  }


  return (
    <div className="relative w-[24vw] h-[14vh] mx-8 my-12 bg-white shadow-md rounded-lg">
      <div className="flex justify-between h-full px-4">
        <div
          className="absolute -top-3 left-5 w-[5rem] h-[5rem] bg-filters rounded flex justify-center items-center shadow-lg">
          {renderImage()}

        </div>
        <div className="flex flex-col flex-grow text-right">
          <p className="text-widget font-thin text-base mt-2 ">{title}</p>
          <span className="text-black text-2xl font-medium ">{count}</span>
          <hr className="border-t-2 border-widget mt-6 "/>

          <div className="flex items-center mt-1 ml-4">
            {renderWarning()}
            <p className="text-widget font-regular text-xs">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBenchStatCard;
