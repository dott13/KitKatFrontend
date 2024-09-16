import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import OutlookIcon from "../../../assets/svgs/SvgExporter.tsx";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import {loginUser} from "../../../redux/userSlice/userSlice.tsx";
import { AppDispatch } from "../../../redux/store/configureStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";




interface LoginFormData {
  email: string;
  password: string;
  toggleForm: () => void
}
const LoginForm: React.FC<LoginFormData> = ( {toggleForm} ) => {
  const [formData, setFormData] = useState< Partial<LoginFormData>>({
    email: "",
    password: "",
  });
const [showPassword, setShowPassword] = useState<boolean>(false)




  const [formErrors, setFormErrors] = useState<
      Partial<Record<keyof LoginFormData, string[]>>
  >({});


  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Hook for navigation


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const validateForm = () => {
    const finalErrors: Partial<Record<keyof LoginFormData, string[]>> = {};

    if (!formData.email) {
      finalErrors.email = ["Email is required."];
    }

    if (!formData.password) {
      finalErrors.password = ["Password is required."];
    }

    setFormErrors(finalErrors);

    return Object.keys(finalErrors).length === 0;
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await dispatch(
            loginUser({
              email: formData.email as string,
              password: formData.password as string,
            })
        ).unwrap();

        localStorage.setItem("token", response.token);
        localStorage.setItem("isLogged", String(true));

        navigate("/dashboard");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error during registration or login:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
      }
    }
  };


  return (
      <div className="w-96 m-auto bg-widget border-solid border-inherit border-[1px] rounded-[10px] mt-10">
        <h2 className="text-xl font-bold pt-6 text-center">Your Logo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 pb-6 flex flex-col mx-12">
            <h3 className="text-xl font-bold">Log in</h3>

            <div className="mt-4">
              <label htmlFor="email text-sm" className="block">
                Email:
              </label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email"
                  className={`w-full px-3 py-1 mt-2 text-sm border text-black ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded`}
              />
              {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mt-4 block">
              <label htmlFor="password" className="block text-sm">
                Password:
              </label>
              <div
                  className={` px-3 py-1 mt-2 border flex justify-between items-center ${formErrors.password ? "border-red-500" : "border-gray-300"} rounded bg-gray-50 `}
              >
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`text-sm text-black bg-gray-50 focus:border-none focus:outline-none`}
                />
                <div
                    onClick={()=>setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaRegEyeSlash className={"text-gray-500"}/> : <FaRegEye  className={"text-gray-500"}/>}

                </div>

              </div>

              {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
              )}
            </div>
            {/*TODO fix the hover area*/}
            <a className={"mt-4  hover:underline inline-block text-sm hover:cursor-pointer"}>Forgot Password?</a>

            <button
                type="submit"
                className="bg-button text-black text-center mt-6 w-full py-4 font-bold text-base rounded"
            >
              Log in
            </button>
            <p className="text-[13px] my-6 text-center">or continue with</p>
            <div className="flex justify-center items-center ">
              <button className="bg-button w-36 py-3 mr-3 rounded">
                <FcGoogle className="m-auto" size={24}/>
              </button>
              <button className="bg-button w-36 py-3 ml-3 rounded">
                <OutlookIcon className="m-auto"/>
              </button>
            </div>
            <p className={"my-6  text-xs"}>
              Don't have account yet?
              <a className={"font-semibold ml-1 hover:underline hover:cursor-pointer inline-block"}
                 onClick={toggleForm}
               >  Register here</a>
            </p>
          </div>
        </form>
      </div>
  )
};

export default LoginForm;
