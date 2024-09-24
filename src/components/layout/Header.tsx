import { IoMdSearch } from "react-icons/io";
import user_img from "../../assets/svgs/default-user.svg";
import { FaChevronDown } from "react-icons/fa6";




const Header = ( ) => {

  return (
    <header className="bg-white flex z-10  items-center ml-[20%]  w-[80%] fixed top-0">
      {/* Vertical line */}
      <div className="h-20 border-l-1 border-[#F1F5F9] "/>
      {/* header widgets */}
      <div className="px-[20px] py-[10px] flex flex-grow flex-row-reverse  items-center gap-5 text-black">

        {/*Profile icons*/}
        <button className="rounded w-[20%] flex flex-row  h-14 bg-main items-center justify-between px-[1.5%]">
          <img className=" w-10 h-10 " src={user_img} alt="user_img"/>
          <p className="font-bold">Angela L.</p>
            <FaChevronDown />
        </button>

        {/*search bar*/}
        <div className="border-2 rounded border-widget w-[20%] h-14  flex items-center pl-[1%]">
          <button>
            <IoMdSearch className="text-widget w-[25px] h-[25px] "/>
          </button>
          <input
            name="search"
            id="search"
            type="text"
            placeholder="Search..."
            className="h-full relative w-full pl-[2%] bg-transparent focus:outline-0"
          />

        </div>
      </div>
    </header>

  )

};

export default Header;
