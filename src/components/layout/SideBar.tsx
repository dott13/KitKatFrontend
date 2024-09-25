import { IoIosCheckboxOutline } from "react-icons/io";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { PiSquaresFour } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { FaUser } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

interface SideBarProps {
  pageState:"dashboard"|"employees"|"project"|"settings"|"logout"

}

const SideBar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  // Get the last part of the URL to use as the pageState
  const pageState = location.pathname.split(
    "/"
  )[1] as SideBarProps["pageState"];

  return (
    <aside className="bg-white w-[20%] h-screen z-101 px-[1%] border-r-2 border-[#F1F5F9] text-black fixed top-0 flex flex-col  justify-between">
      <img className=" w-[200px] h-20 mx-auto" src={logo} alt="Logo" />

        {/* Horizontal line */}
      <div className="w-full border-t-[1px] border-widget mt-1" />

      <div className="flex flex-col h-full items-center justify-between">
        {/*top*/}
        <div className="mt-8 w-full text-widget">
          <p className="font-bold">MENU</p>
          <nav className="mt-4">
            <ul>
              <li
                className={`font-light h-14 text-[18px] flex items-center gap-[10%] px-[5%]  rounded ${
                  pageState === "dashboard"
                    ? "bg-widget text-white"
                    : "bg-white"
                }`}
                onClick={() => navigate("/dashboard")}
              >
                  <PiSquaresFour className="w-[30px] h-[30px]"/>
                <p>Dashboard</p>
              </li>
              <li
                className={`font-light text-[18px] h-14 flex items-center gap-[10%] px-[5%] rounded ${
                  pageState === "employees"
                    ? "bg-widget text-white"
                    : "bg-white"
                }`}
                onClick={() => navigate("employees")}
              >
                  <IoIosCheckboxOutline className="w-[30px] h-[30px]"/>
                <p>Employees</p>
              </li>
              <li
                  className={`font-light text-[18px] h-14 flex items-center gap-[10%] px-[5%] rounded ${pageState === "account" ? 'bg-widget text-white' : 'bg-white'}`}
                  onClick={() => navigate("account")}
                >
                  <FaUser className="w-[25px] h-[25px]"/>
                  <p>Your Account</p>
                </li>
                <li
                className={`font-light text-[18px] h-14 flex items-center gap-[10%] px-[5%]  rounded ${
                  pageState === "project" ? "bg-widget text-white" : "bg-white"
                }`}
                onClick={() => navigate("/project")}
              >
                  <AiOutlineFundProjectionScreen className="w-[30px] h-[30px]"/>
                <p>Projects</p>
              </li>
            </ul>
          </nav>

          <div className="w-full border-t-[1px] border-widget mt-4" />
        </div>

        {/*bottom*/}
        <div className="mb-8 w-full text-widget">
          <nav>
            <li
              className={`font-light h-14 text-[18px] flex items-center gap-[10%] px-[5%]  rounded ${
                pageState === "settings" ? "bg-widget text-white" : "bg-white"
              }`}
              onClick={() => navigate("/settings")}
            >
                <FiSettings className="w-[27px] h-[27px]"/>
              <p>Settings</p>
            </li>

            <div className="w-full border-t-[1px] border-widget my-4" />

            <li
              onClick={() => navigate("/logout")}
              className={`font-light h-14 text-[18px] flex items-center gap-[10%] px-[5%]   rounded ${
                pageState === "logout" ? "bg-widget text-white" : "bg-white"
              }`}
            >
              <SlLogout className="w-[23px] h-[23px]" />
              <p>Log Out</p>
            </li>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
