import React from "react";
import user_img from "../../../assets/svgs/default-user.svg";

const ProjectDetails: React.FC = () => {
  return (
    <div
      className="bg-white text-black rounded flex flex-col items-center justify-center w-[80%] h-full mx-[5%] mt-[5%] p-[2%] pb-0 gap-8">
      <p className="text-center w-full font-bold text-lg">Project Name</p>
      <p className="text-right w-full text-sm">Start Date: xx.xx.xxxx</p>
      <p className="mt-4 text-center w-full">
        DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
        DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
        DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
      </p>
      <p className="text-center font-semibold text-m">Managers</p>
      <div className="flex flex-row items-center gap-[-2]">
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>

      </div>
      <p className="text-center font-semibold text-m">Workers</p>
      <div className="flex flex-row items-center gap-[-2]">
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
        <img className=" w-10 h-10 " src={user_img} alt="user_img"/>

      </div>
    </div>
  );
};

export default ProjectDetails;
