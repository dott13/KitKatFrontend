import React from "react";
import bench from "../../../assets/svgs/bench-back.svg";
import {MdAccessTimeFilled} from "react-icons/md";
import {FaMapMarkerAlt} from "react-icons/fa";
import {BiError, BiErrorAlt, BiErrorCircle} from "react-icons/bi";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';




interface OnBenchStatData {
  title: string;
  count: string | number |null;
  description: string;
  icon: "bench"|"clock"|"map";
  warning: "triangle"|"octagon"|"circle"
  status: "idle" | "loading" | "succeeded" | "failed";
}

const OnBenchStatCard: React.FC<OnBenchStatData> = ({title, count, description, icon, warning, status}) => {
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
    <div className="relative w-[100%] h-[14vh]  bg-white shadow-md rounded-lg">
      <div className="flex flex-col flex-grow text-right justify-between h-full px-4 pb-4">
        <div
          className="absolute -top-3 left-5 w-[5rem] h-[5rem] bg-filters rounded flex justify-center items-center shadow-lg">
          {renderImage()}
        </div>
        <p className="text-widget font-thin text-base  mt-2">{title}</p>
        <div>
          {status === "succeeded" ? (
            <span className="text-black text-2xl font-medium">{count}</span>
          ) : (
            <Spin
              indicator={<LoadingOutlined spin style={{ fontSize: 24, color: '#8A7D66' }} />}
            />
          )}
        </div>
        <hr className="border-t-2 border-widget  "/>

        <div className="flex  items-center mb-[-7px]  ml-4">
          {renderWarning()}
          <p className="text-widget font-regular text-xs">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnBenchStatCard;
