import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import OutlookIcon from "../../../assets/svgs/SvgExporter.tsx";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { Tooltip } from "antd"; // Import Ant Design Tooltip
import { loginUser } from "../../../redux/userSlice/userSlice.tsx";
import { AppDispatch } from "../../../redux/store/configureStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login-button.css"


interface LoginFormData {
  email: string;
  password: string;
  toggleForm: (toggleType:"login"|"register"|"reset"|"redirect") => void;
}

const LoginForm: React.FC<LoginFormData> = ({ toggleForm }) => {
  const [formData, setFormData] = useState<Partial<LoginFormData>>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
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
  };

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
        localStorage.setItem("isLoggedIn", String(true));
        navigate("/dashboard");
      } catch (error) {
        if (typeof error === "string") {
          if (error.includes("User not found")) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              email: ["User with this email not found."],
            }));
          } else if (error.includes("Incorrect password")) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              password: ["Incorrect password. Try again."],
            }));
          } else {
            console.error("Error during login:", error);
          }
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
            <label htmlFor="email" className="block text-sm">
              Email:
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full pl-10 pr-3 py-1 mt-2 text-sm border text-black ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded relative`}
              />
              {formErrors.email && (
                <Tooltip
                  title={formErrors.email[0]}
                  placement="top"
                  overlayClassName="custom-tooltip" //Class for changing the style of antds tooltips
                >
                  <FiAlertTriangle className="absolute left-3 text-red-500 top-[40%]" />
                </Tooltip>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm">
              Password:
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full pl-10 pr-3 py-1 mt-2 text-sm text-black border ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                } rounded relative`}
              />
              {formErrors.password && (
                <Tooltip
                  title={formErrors.password[0]}
                  placement="top"
                  overlayClassName="custom-tooltip"
                >
                  <FiAlertTriangle className="absolute left-3 text-red-500 top-[40%] align-items" />
                </Tooltip>
              )}
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 cursor-pointer top-[40%]"
              >
                {showPassword ? (
                  <FaRegEyeSlash className="text-gray-500" />
                ) : (
                  <FaRegEye className="text-gray-500" />
                )}
              </div>
            </div>
          </div>

          <a className="mt-4 hover:underline inline-block text-sm hover:cursor-pointer" onClick={() => toggleForm("reset")}>
            Forgot Password?
          </a>

          <button
            type="submit"
            className="login-animated-button bg-button text-black text-center mt-6 w-full py-4 font-bold text-base rounded "
          >
            Log in
          </button>

          <p className="text-[13px] my-6 text-center">or continue with</p>
          <div className="flex justify-center items-center">
              <button className="login-animated-button bg-button w-36 py-3 mr-3 rounded">
              <FcGoogle className="m-auto" size={24} />
            </button>
              <button className="login-animated-button bg-button w-36 py-3 ml-3 rounded">
              <OutlookIcon className="m-auto" />
            </button>
          </div>
          <p className="my-6 text-xs">
            Don't have an account yet?
            <a
              className="font-semibold ml-1 hover:underline hover:cursor-pointer inline-block"
                  onClick={() => toggleForm("register")}
              >  Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
