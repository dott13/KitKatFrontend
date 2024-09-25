import {BiReset} from "react-icons/bi";
import {CiCirclePlus, CiLock, CiMail, CiStar} from "react-icons/ci";
import {IoMdCloudUpload} from "react-icons/io";
import user_img from "../../../assets/svgs/default-user.svg";
import {PiBriefcaseLight, PiCityLight} from "react-icons/pi";
import {TbWorld} from "react-icons/tb";


const AccountForm =()=>{

  const formErrors = false;
  return(
    <>
      <div className="bg-white text-black rounded flex-col items-center justify-center w-[90%] h-full mx-[5%] mt-[5%] p-[2%] pb-0 ">
        {/*personal info*/}
        <div className="flex w-full justify-between border-b border-widget pb-2">

          {/*text*/}
          <div className="flex flex-col w-fit items-start justify-center">
            <h1 className="font-bold text-[18px]">Personal Info</h1>
            <p className="font-light text-[14px]">Update photo and personal details here</p>
          </div>
          {/*buttons*/}
          <div className="flex w-fit items-center justify-between gap-[10%]">
            <button className=" flex items-center justify-center border rounded border-widget text-widget w-[100px] h-10 gap-[5%]">
              <p className="font-bold ">Reset</p>
              <BiReset  className=" font-bold w-[22px] h-[22px]"/>
            </button>
            <button className="bg-widget rounded w-[100px] h-10">
              <p className="font-bold text-white">Save</p>
            </button>
          </div>

        </div>


        {/*name surname*/}
        <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">

          {/*text*/}
          <div className="ml-8 flex w-[150px] items-center ">
            <p className="font-light text-[14px]">Name </p>
            <p className="text-red-500"> *</p>
          </div>

          <div className="flex w-[40%] items-center justify-between h-[40px] ">

            <input
              name="name"
              id="name"
              type="text"
              placeholder="Name"
              className={`border border-widget rounded px-4 h-full w-[48%] focus:outline-0 ${
                formErrors ? "border-red-500" : "border-gray-300"}`}
            />

            <input
              name="surname"
              id="surname"
              type="text"
              placeholder="Surname"
              className={`border border-widget rounded px-4 h-full w-[48%] focus:outline-0 ${
                formErrors ? "border-red-500" : "border-gray-300"}`}
            />

          </div>
          {/*reset*/}
          <button className=" border rounded border-widget text-widget w-[40px] h-[40px]">
            <BiReset className=" m-auto font-bold w-[25px] h-[25px]"/>
          </button>



        </div>


        {/*email*/}
        <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">

          {/*text*/}
          <div className="ml-8 flex w-[150px] items-center ">
            <p className="font-light text-[14px]">Email </p>
          </div>

          <div className="flex f w-[40%] items-center justify-center h-[40px] gap-5">


            <div className={` flex items-center border bg-[#CFCFCF] bg rounded px-4 h-full w-full focus:outline-0 ${
              formErrors ? "border-red-500" : "border-widget"}`}>
              <CiMail className="w-[20px] h-[20px] text-widget"/>
              <input
              name="email"
              id="email"
              type="text"
              placeholder="youremail@email.com"
              className={` bg-[#CFCFCF] rounded px-4 focus:outline-0 `}
            />


            </div>

            <CiLock className="h-[40px] w-[40px] text-widget"/>
          </div>

          {/*reset*/}
          <button className=" border rounded border-widget text-widget w-[40px] h-[40px]">
            <BiReset className=" m-auto font-bold w-[25px] h-[25px]"/>
          </button>



        </div>

        {/*photo*/}
        <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">

          {/*text*/}
          <div className="ml-8 flex w-[150px] items-start mt-3">
            <p className="font-light text-[14px] ">Your photo </p>
          </div>

          <div className="flex  w-[40%] items-top  h-[150px] gap-5">
            <img className=" w-10 h-10 " src={user_img} alt="user_img"/>


            <div
              className={` relative flex flex-col cursor-pointer items-center justify-between border bg-white bg rounded px-4 h-full w-[100%] focus:outline-0 ${
                formErrors ? "border-red-500" : "border-widget"}`}>
              <input
                name="photo"
                id="photo"
                type="file"
                className={`w-full h-full cursor-pointer rounded px-4 focus:outline-0 file:hidden text-white z-10`}
              />
              <label htmlFor="fileUpload" className=" absolute z-1 text-gray-400 cursor-pointer flex flex-col items-center mt-10">
                <div className="border border-widget rounded p-1">
                  <IoMdCloudUpload className=" w-[30px] h-[30px]"/>
                </div>
                <p>Click to Upload or drag and drop </p>
                <p className="font-semibold">SVG, PNG or JPG</p>
              </label>
            </div>


          </div>

          {/*reset*/}
          <button className=" border rounded border-widget text-widget w-[40px] h-[40px]">
            <BiReset className=" m-auto font-bold w-[25px] h-[25px]"/>
          </button>



        </div>

        {/*country*/}
        <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">

          {/*text*/}
          <div className="ml-8 flex w-[150px] items-center ">
            <p className="font-light text-[14px]">Country/City </p>
            <p className="text-red-500"> *</p>
          </div>

          <div className="flex w-[40%] items-center text-widget justify-between h-[40px] ">

            <div className={`  flex items-center border border-widget rounded px-2 h-full w-[48%] focus:outline-0 ${
              formErrors ? "border-red-500" : "border-widget"}`}>
              <TbWorld className="w-[25px] h-[25px]"/>

              <select
                name="country"
                id="country"
                className="w-full h-full focus:outline-0 cursor-pointer"
              >

                <option value="">Select Country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="MD">Moldova</option>
                <option value="USA">USA</option>
              </select>

            </div>



            <div className={`flex items-center border border-widget rounded px-2 h-full w-[48%] focus:outline-0 ${
              formErrors ? "border-red-500" : "border-widget"}`}>
              <PiCityLight className="w-[25px] h-[25px]"/>


              <select
                name="city"
                id="city"
                className="w-full h-full focus:outline-0 cursor-pointer"
              >

                <option value="">Select City</option>
                <option value="CH">Chisinau</option>
                <option value="ORH">Orhei</option>
                <option value="USA">USA</option>
              </select>

            </div>
          </div>
          {/*reset*/}
          <button className=" border rounded border-widget text-widget w-[40px] h-[40px]">
            <BiReset className=" m-auto font-bold w-[25px] h-[25px]"/>
          </button>
        </div>

        {/*language*/}
        <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">

          {/*text*/}
          <div className="ml-8 flex w-[150px] items-center ">
            <p className="font-light text-[14px]">Language</p>
            <p className="text-red-500"> *</p>
          </div>

          <div className="flex w-[40%] items-center text-widget justify-between h-[40px] ">

            <div className={`flex relative items-center border border-widget rounded px-2 h-full w-fit focus:outline-0 ${
              formErrors ? "border-red-500" : "border-widget"}`}
                 onClick={(event) => {
                   event.stopPropagation();
                   const selectElement = event.target as HTMLElement; // Cast to HTMLElement
                   selectElement.querySelector('select')?.focus();
                 }}
            >

              <CiCirclePlus className="w-[25px] h-[25px] absolute z-1"  />

              <select
                name="language"
                id="language"
                className="w-6 h-full focus:outline-0 z-10 appearance-none bg-transparent text-transparent"
              >

                <option value=""></option>
                <option value="RO">Romanian</option>
                <option value="RU">Russian</option>
                <option value="EN">English</option>
              </select>
            </div>

          </div>
          {/*reset*/}
          <button className=" border rounded border-widget text-widget w-[40px] h-[40px]">
            <BiReset className=" m-auto font-bold w-[25px] h-[25px]"/>
          </button>
        </div>

        {/*Position*/}
        <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">

          {/*text*/}
          <div className="ml-8 flex w-[150px] items-center ">
            <p className="font-light text-[14px]">Position</p>
            <p className="text-red-500"> *</p>
          </div>

          <div className="flex items-center ju w-[40%]  text-widget justify-between h-[40px] ">


            <div className={`flex items-center border border-widget rounded px-2 h-full w-[100%] focus:outline-0 ${
              formErrors ? "border-red-500" : "border-widget"}`}>
              <PiBriefcaseLight className="w-[25px] h-[25px]"/>


              <select
                name="position"
                id="position"
                className="w-full h-full focus:outline-0 cursor-pointer"
              >

                <option value="">Select Position</option>
                <option value="IT technician">IT technician</option>
                <option value="Support specialist">Support specialist</option>
                <option value="Quality assurance tester">Quality assurance tester</option>
                <option value="IT security specialist">IT security specialist</option>
                <option value="Computer programmer">Computer programmer</option>
                <option value="System analyst">System analyst</option>
                <option value="Network engineer">Network engineer</option>
                <option value="Software engineer">Software engineer</option>
                <option value="User experience designer">User experience designer</option>
                <option value="Database administrator">Database administrator</option>
                <option value="Data scientist">Data scientist</option>
                <option value="Computer scientist">Computer scientist</option>
                <option value="IT director">IT director</option>

              </select>

            </div>


          </div>
          {/*reset*/}
          <button className=" border rounded border-widget text-widget w-[40px] h-[40px]">
            <BiReset className=" m-auto font-bold w-[25px] h-[25px]"/>
          </button>
        </div>

        {/*Seniority*/}
        <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">

          {/*text*/}
          <div className="ml-8 flex w-[150px] items-center ">
            <p className="font-light text-[14px]">Seniority</p>
            <p className="text-red-500"> *</p>
          </div>

          <div className="flex items-center ju w-[40%]  text-widget justify-between h-[40px] ">


            <div className={`flex items-center border border-widget rounded px-2 h-full w-[100%] focus:outline-0 ${
              formErrors ? "border-red-500" : "border-widget"}`}>
              <CiStar className="w-[25px] h-[25px]"/>
              <select
                name="position"
                id="position"
                className="w-full h-full focus:outline-0 cursor-pointer"
              >
                <option value="">Select Seniority</option>
                <option value="Junior">Junior</option>
                <option value="Associate">Associate</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Manager">Manager</option>
              </select>

            </div>


          </div>
          {/*reset*/}
          <button className="border rounded border-widget text-widget w-[40px] h-[40px]">
            <BiReset className=" m-auto font-bold w-[25px] h-[25px]"/>
          </button>
        </div>

        {/*CV*/}
        <div className="flex w-full justify-between  mt-4 pb-2">

          {/*text*/}
          <div className="ml-8 flex w-[150px] items-start mt-3">
            <p className="font-light text-[14px] ">Curriculum Vitae </p>
            <p className="text-red-500"> *</p>
          </div>

          <div className="flex  w-[40%] items-top  h-[150px] gap-5">
            <div
              className={` flex relative flex-col cursor-pointer items-center justify-between border bg-white bg rounded px-4 h-full w-[100%] focus:outline-0 ${
                formErrors ? "border-red-500" : "border-widget"}`}>
              <input
                name="cv"
                id="cv"
                type="file"
                className={`w-full h-full cursor-pointer z-10 rounded px-4 focus:outline-0 file:hidden text-white `}
              />
              <label htmlFor="fileUpload" className=" absolute z-1 text-gray-400  flex flex-col items-center mt-10">
                <div className="border border-widget rounded p-1">
                  <IoMdCloudUpload className=" w-[30px] h-[30px]"/>
                </div>
                <p>Click to Upload or drag and drop </p>
                <p className="font-semibold">PDF or DOCX</p>
              </label>
            </div>


          </div>

          {/*reset*/}
          <button className=" border rounded border-widget text-widget w-[40px] h-[40px]">
            <BiReset className=" m-auto font-bold w-[25px] h-[25px]"/>
          </button>



        </div>




      </div>
    </>
  )
}

export default AccountForm