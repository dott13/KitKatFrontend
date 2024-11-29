import { BiReset } from "react-icons/bi";
import { CiCirclePlus, CiLock, CiMail, CiStar } from "react-icons/ci";
import { IoMdCloudUpload } from "react-icons/io";
import user_img from "../../../assets/svgs/default-user.svg";
import { PiBriefcaseLight, PiCityLight } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
} from "../../../redux/store/configureStore.tsx";
import {
  getUserByEmail,
  updateUser,
} from "../../../redux/userSlice/userSlice.tsx";
import { getIdFromToken } from "../../../utils/tokenUtils/getIdFromToken.tsx";
import {
  LanguageAbbreviations,
  languageAbbreviationsIdMap,
} from "../../../utils/languages.ts";
import { CityIdMap, ReversedCountryIdMap } from "../../../utils/country.ts";
import { JobTitleIdMap } from "../../../utils/Position.ts";
import { JobTitleRankIdMap } from "../../../utils/Seniority.ts";
import { getMailFromToken } from "../../../utils/tokenUtils/getMailFromToken.tsx";

const CheckboxWithIcon = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };

  return (
    <label className="relative flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="appearance-none text-widget border rounded border-widget w-[40px] h-[40px] checked:text-white checked:bg-widget cursor-pointer"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <BiReset
        className={`absolute left-[8px] w-[25px] h-[25px] ${
          isChecked ? "text-white" : "text-widget"
        }`}
      />
    </label>
  );
};

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  avatar: Uint8Array;
  position: string;
  seniority: string;
  city: string;
  country: string;
  languages: string[];
  cv: Uint8Array;
}

const AccountForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);
  const userRoot = useSelector((state: RootState) => state.user);

  const [user, setUser] = useState<Partial<UserData>>({
    firstName: "",
    lastName: "",
    email: "",
    avatar: new Uint8Array(),
    position: "",
    seniority: "",
    city: "",
    country: "",
    languages: [],
    cv: new Uint8Array(),
  });
  useEffect(() => {
    dispatch(() => {
      getUserByEmail(getMailFromToken(token!));
    });
  }, [dispatch, token, userRoot]);

  useEffect(() => {
    const mappedLanguages = userRoot.user?.languages.map(
      (language) => language.languageName
    ); // Map each ID to the language code

    setUser(() => ({
      firstName: userRoot.user?.firstName || "",
      lastName: userRoot.user?.lastName || "",
      email: userRoot.user?.email || "",
      avatar: new Uint8Array(),
      position: userRoot.user?.position || "",
      seniority: userRoot.user?.seniority?.name || "",
      city: userRoot.user?.city?.cityName || "",
      country: userRoot.user?.city?.country.countryName || "",
      languages: mappedLanguages || [],
      cv: new Uint8Array(),
    }));
  }, [userRoot]);

  const [dataErrors, setDataErrors] = useState<
    Partial<Record<keyof UserData, string[]>>
  >({});

  const idFromToken = getIdFromToken(token!);

  const resetUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      firstName: "",
      lastName: "",
      avatar: new Uint8Array(),
      position: "",
      seniority: "",
      city: "",
      languages: [],
      cv: new Uint8Array(),
    });
  };
  const resetUserLang = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    console.log(index);
    setUser((prevUser) => ({
      ...prevUser,
      languages:
        prevUser.languages?.filter((_, langIndex) => langIndex !== index) || [],
    }));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "languages" || name === "skills") {
      setUser((prevUser) => {
        const currentArray =
          (prevUser[name as keyof UserData] as string[]) || [];
        const updatedArray = currentArray.includes(value)
          ? currentArray
          : [...currentArray, value];

        return {
          ...prevUser,
          [name]: updatedArray, // Update the languages or skills array
        };
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
    console.log("user", user);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("File upload triggered"); // Add this log

    if (file) {
      const fileType = file.type;
      const allowedTypes = ["image/png", "image/svg+xml", "image/jpeg"];

      // Check if the file type is PNG, SVG, or JPG
      if (!allowedTypes.includes(fileType)) {
        setDataErrors((prevState) => ({
          ...prevState,
          avatar: ["Not allowed  type of file, please use png or svg or jpeg"],
        }));
        console.log("Not allowed  type of file, please use png or svg or jpeg");
        return; // Exit the function if the file is not valid
      }

      setDataErrors((prevState) => ({
        ...prevState,
        avatar: undefined,
      }));
      console.log(dataErrors.avatar);

      const reader = new FileReader();
      reader.onloadstart = () => {
        console.log("File reading started...");
      };
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);

        setUser((prevState) => ({
          ...prevState,
          avatar: byteArray,
        }));
      };
      reader.onerror = () => {
        console.error("Error reading the file");
      };

      reader.readAsArrayBuffer(file!); // Ensure file is read as ArrayBuffer
    } else {
      console.log("No file selected.");
    }
  };
  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("File upload triggered"); // Add this log

    if (file) {
      const fileType = file.type;
      const allowedTypes = [
        "application/pdf", // PDF
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
        "application/msword", // DOC
      ];

      // Check if the file type is PNG, SVG, or JPG
      if (!allowedTypes.includes(fileType)) {
        setDataErrors((prevState) => ({
          ...prevState,
          cv: ["Not allowed  type of file, please use pdf or doc or docx"],
        }));
        console.log("Not allowed  type of file, please use pdf or doc or docx");
        return; // Exit the function if the file is not valid
      }
      setDataErrors((prevState) => ({
        ...prevState,
        cv: undefined,
      }));

      const reader = new FileReader();
      reader.onloadstart = () => {
        console.log("File reading started...");
      };
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);

        setUser((prevState) => ({
          ...prevState,
          cv: byteArray,
        }));
      };
      reader.onerror = () => {
        console.error("Error reading the file");
      };

      reader.readAsArrayBuffer(file!); // Ensure file is read as ArrayBuffer
    } else {
      console.log("No file selected.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isLoading) return;
    setIsLoading(true);
    e.preventDefault();
    try {
      await dispatch(
        updateUser({
          userId: idFromToken!,
          firstName: user.firstName ? (user.firstName as string) : null,
          lastName: user.lastName ? (user.lastName as string) : null,
          avatar:
            user.avatar && user.avatar.length > 0
              ? (user.avatar as Uint8Array)
              : null,
          position: user.position
            ? //todo find the right request type :((
              // JobTitleIdMap[user.position].toString()
              user.position
            : null,
          seniority: user.seniority ? (user.seniority as string) : null,
          city: user.city ? user.city : null,
          languages:
            user.languages && user.languages.length > 0
              ? user.languages
                  .map((language) => languageAbbreviationsIdMap[language])
                  .join(",")
              : null,
          cv: user.cv && user.cv.length > 0 ? (user.cv as Uint8Array) : null,
        })
      );
      await dispatch(getUserByEmail(getMailFromToken(token!)));
    } catch (error) {
      if (typeof error === "string") {
        if (error.includes("City not found")) {
          setDataErrors((prevErrors) => ({
            ...prevErrors,
            city: ["UserData with this email not found."],
          }));
        } else if (error.includes("Incorrect password")) {
          setDataErrors((prevErrors) => ({
            ...prevErrors,
            password: ["Incorrect password. Try again."],
          }));
        } else {
          setDataErrors((prevErrors) => ({
            ...prevErrors,
            firstName: ["error during update"],
          }));
          console.error("Error during login:", error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white text-black rounded flex-col items-center justify-center w-[90%] h-full mx-[5%] mt-[5%] p-[2%] pb-0 ">
        <form onSubmit={handleSubmit}>
          {/*personal info*/}
          <div className="flex w-full justify-between border-b border-widget pb-2">
            {/*text*/}
            <div className="flex flex-col w-fit items-start justify-center">
              <h1 className="font-bold text-[18px]">Personal Info</h1>
              <p className="font-light text-[14px]">
                Update photo and personal details here
              </p>
            </div>
            {/*buttons*/}
            <div className="flex w-fit items-center justify-between gap-[10%]">
              <button
                onClick={resetUser}
                className=" flex items-center justify-center border rounded border-widget text-widget w-[100px] h-10 gap-[5%]"
              >
                <p className="font-bold ">Reset</p>
                <BiReset className=" font-bold w-[22px] h-[22px]" />
              </button>
              <button
                className="bg-widget rounded w-[100px] h-10 "
                type="submit"
              >
                <p className="font-bold text-white">Save</p>
              </button>
            </div>
          </div>

          {/*name surname---------------------------------------------------------------------------------*/}
          <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">
            {/*text*/}
            <div className="ml-8 flex w-[150px] items-center ">
              <p className="font-light text-[14px]">Name </p>
              <p className="text-red-500"> *</p>
            </div>
            <div className="flex w-[40%] items-center justify-between h-[40px] ">
              <input
                name="firstName"
                id="firstName"
                type="text"
                placeholder="Name"
                className={`border text-black rounded px-4 h-full w-[48%] focus:outline-0 ${
                  dataErrors.firstName ? "border-red-500" : "border-widget"
                }`}
                value={user.firstName}
                onChange={handleChange}
              />
              <input
                name="lastName"
                id="lastName"
                type="text"
                placeholder="Surname"
                value={user.lastName}
                onChange={handleChange}
                className={`border rounded px-4 h-full w-[48%] focus:outline-0 ${
                  dataErrors.lastName ? "border-red-500" : "border-widget"
                }`}
              />
            </div>
            <CheckboxWithIcon />
          </div>

          {/*email---------------------------------------------------------------------------------*/}
          <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">
            {/*text*/}
            <div className="ml-8 flex w-[150px] items-center ">
              <p className="font-light text-[14px]">Email </p>
            </div>
            <div className="flex f w-[40%] items-center justify-center h-[40px] gap-5">
              <div
                className={` flex items-center border bg-[#CFCFCF] bg rounded px-4 h-full w-full focus:outline-0 border-widget`}
              >
                <CiMail className="w-[20px] h-[20px] text-widget" />
                <input
                  name="email"
                  id="email"
                  type="text"
                  placeholder={user.email}
                  disabled={true}
                  className={` bg-[#CFCFCF] rounded px-4 focus:outline-0 `}
                />
              </div>
              <CiLock className="h-[40px] w-[40px] text-widget" />
            </div>
            <CheckboxWithIcon />
          </div>

          {/*photo---------------------------------------------------------------------------------*/}
          <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">
            {/*text*/}
            <div className="ml-8 flex w-[150px] items-start mt-3">
              <p className="font-light text-[14px] ">Your photo </p>
            </div>
            <div className="flex  w-[40%] items-top  h-[150px] gap-5">
              <img className=" w-10 h-10 " src={user_img} alt="user_img" />

              <div
                className={` relative flex flex-col cursor-pointer items-center justify-between border bg-white bg rounded px-4 h-full w-[100%] focus:outline-0 ${
                  dataErrors.avatar ? "border-red-500" : "border-widget"
                }  ${user.avatar?.length === 0 ? "bg-white" : "bg-widget"}`}
              >
                <input
                  name="photo"
                  id="photo"
                  type="file"
                  className={`w-full px-20 pt-20 h-full cursor-pointer rounded  focus:outline-0 file:hidden  z-10  ${
                    user.avatar?.length === 0
                      ? "text-transparent"
                      : "text-white"
                  }`}
                  onChange={handlePhotoChange}
                />
                <label
                  htmlFor="fileUpload"
                  className={`absolute z-1 text-widget cursor-pointer flex flex-col items-center mt-10 
                `}
                >
                  <div
                    className={`border border-widget rounded p-1 ${
                      user.avatar?.length === 0 ? "text-widget" : "text-white"
                    }`}
                  >
                    <IoMdCloudUpload className=" w-[30px] h-[30px]" />
                  </div>
                  <p>Click to Upload or drag and drop </p>
                  <p className="font-semibold">SVG, PNG or JPG</p>
                </label>
              </div>
            </div>
            <CheckboxWithIcon />
          </div>

          {/*country---------------------------------------------------------------------------------*/}
          <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">
            {/*text*/}
            <div className="ml-8 flex w-[150px] items-center ">
              <p className="font-light text-[14px]">Country/City </p>
              <p className="text-red-500"> *</p>
            </div>

            <div className="flex w-[40%] items-center text-widget justify-between h-[40px] ">
              <div
                className={`flex items-center border rounded px-2 h-full w-[48%] focus:outline-0 ${
                  dataErrors.city ? "border-red-500" : "border-widget"
                }`}
              >
                <TbWorld className="w-[25px] h-[25px]" />

                <select
                  name="country"
                  id="country"
                  className="w-full h-full focus:outline-0 cursor-pointer"
                  onChange={handleChange}
                  value={user.country}
                >
                  <option value="">Select Country</option>
                  {Object.entries(ReversedCountryIdMap).map(
                    ([countryName, countryId]) => (
                      <option key={countryId} value={countryName}>
                        {countryName}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div
                className={`flex items-center border  rounded px-2 h-full w-[48%] focus:outline-0 ${
                  dataErrors.city ? "border-red-500" : "border-widget"
                }`}
              >
                <PiCityLight className="w-[25px] h-[25px]" />

                <select
                  name="city"
                  id="city"
                  className="w-full h-full focus:outline-0 cursor-pointer"
                  onChange={handleChange}
                  value={user.city}
                >
                  <option value="">Select City</option>
                  {Object.entries(CityIdMap).map(([cityName, cityId]) => (
                    <option key={cityId} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <CheckboxWithIcon />
          </div>

          {/*language---------------------------------------------------------------------------------*/}
          <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">
            {/*text*/}
            <div className="ml-8 flex w-[150px] items-center ">
              <p className="font-light text-[14px]">Language</p>
              <p className="text-red-500"> *</p>
            </div>

            <div className="flex w-[40%] items-center text-widget justify-start gap-[3%] h-[40px] ">
              <div
                className={`flex hover:bg-widget hover:text-white cursor-pointer relative items-center border rounded px-2 h-full w-fit focus:outline-0 ${
                  dataErrors.languages ? "border-red-500" : "border-widget"
                }`}
              >
                <CiCirclePlus className="w-[25px] h-[25px] absolute z-1 cursor-pointer" />

                <select
                  name="languages"
                  id="languages"
                  className="w-6 h-full cursor-pointer focus:outline-0 z-10  appearance-none bg-transparent text-transparent"
                  value={""}
                  onChange={handleChange}
                >
                  <option value="">Select Language</option>
                  {/* Dynamically generate options from the enum */}
                  {Object.entries(LanguageAbbreviations).map(
                    ([abbr, language]) => (
                      <option key={abbr} value={abbr}>
                        {language}
                      </option>
                    )
                  )}
                </select>
              </div>

              {user.languages?.map((language, index) => (
                <div
                  key={index}
                  className="cursor-pointer border flex w-10 border-widget rounded h-full text-widget hover:bg-widget hover:text-white"
                  onClick={(e) => resetUserLang(e, index)}
                >
                  <h1 className="m-auto w-fit h-fit">{language}</h1>
                </div>
              ))}
            </div>

            <CheckboxWithIcon />
          </div>

          {/*Position---------------------------------------------------------------------------------*/}
          <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">
            {/*text*/}
            <div className="ml-8 flex w-[150px] items-center ">
              <p className="font-light text-[14px]">Position</p>
              <p className="text-red-500"> *</p>
            </div>

            <div className="flex items-center ju w-[40%]  text-widget justify-between h-[40px] ">
              <div
                className={`flex items-center border  rounded px-2 h-full w-[100%] focus:outline-0 ${
                  dataErrors.position ? "border-red-500" : "border-widget"
                }`}
              >
                <PiBriefcaseLight className="w-[25px] h-[25px]" />

                <select
                  name="position"
                  id="position"
                  className="w-full h-full focus:outline-0 cursor-pointer"
                  onChange={handleChange}
                  value={user.position}
                >
                  <option value="">Select Position</option>
                  {Object.entries(JobTitleIdMap).map(([title, id]) => (
                    <option key={id} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <CheckboxWithIcon />
          </div>

          {/*Seniority---------------------------------------------------------------------------------*/}
          <div className="flex w-full justify-between border-b border-widget mt-4 pb-2">
            {/*text*/}
            <div className="ml-8 flex w-[150px] items-center ">
              <p className="font-light text-[14px]">Seniority</p>
              <p className="text-red-500"> *</p>
            </div>

            <div className="flex items-center ju w-[40%]  text-widget justify-between h-[40px] ">
              <div
                className={`flex items-center border rounded px-2 h-full w-[100%] focus:outline-0 ${
                  dataErrors.seniority ? "border-red-500" : "border-widget"
                }`}
              >
                <CiStar className="w-[25px] h-[25px]" />
                <select
                  name="seniority"
                  id="seniority"
                  className="w-full h-full focus:outline-0 cursor-pointer"
                  onChange={handleChange}
                  value={user.seniority}
                >
                  <option value="">Select Seniority</option>
                  {Object.entries(JobTitleRankIdMap).map(([title, id]) => (
                    <option key={id} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <CheckboxWithIcon />
          </div>

          {/*CV-----------------------------------------------------------------------------------------*/}
          <div className="flex w-full justify-between  mt-4 pb-2">
            {/*text*/}
            <div className="ml-8 flex w-[150px] items-start mt-3">
              <p className="font-light text-[14px] ">Curriculum Vitae </p>
              <p className="text-red-500"> *</p>
            </div>

            <div className="flex  w-[40%] items-top  h-[150px] gap-5">
              <div
                className={` flex relative flex-col cursor-pointer items-center justify-between border bg-white bg rounded px-4 h-full w-[100%] focus:outline-0 ${
                  dataErrors.cv ? "border-red-500" : "border-widget"
                }  ${user.cv?.length === 0 ? "bg-white" : "bg-widget"}`}
              >
                <input
                  name="cv"
                  id="cv"
                  type="file"
                  className={`w-full h-full px-20 pt-20 cursor-pointer z-10 rounded focus:outline-0 file:hidden ${
                    user.avatar?.length === 0
                      ? "text-transparent"
                      : "text-white"
                  }`}
                  onChange={handleCVChange}
                />
                <label
                  htmlFor="fileUpload"
                  className={` absolute z-1 text-widget flex flex-col items-center mt-10`}
                >
                  <div
                    className={`border border-widget rounded p-1 ${
                      user.cv?.length === 0 ? "text-widget" : "text-white"
                    }`}
                  >
                    <IoMdCloudUpload className=" w-[30px] h-[30px]" />
                  </div>
                  <p>Click to Upload or drag and drop </p>
                  <p className="font-semibold">PDF or DOCX</p>
                </label>
              </div>
            </div>

            <CheckboxWithIcon />
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountForm;
