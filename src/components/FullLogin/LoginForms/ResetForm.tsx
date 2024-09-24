import React, {useState} from "react";
import {FiAlertTriangle} from "react-icons/fi";
import {Tooltip} from "antd";
import {resetPasswordUser} from "../../../redux/userSlice/userSlice.tsx";
import {AppDispatch} from "../../../redux/store/configureStore";
import {useDispatch} from "react-redux";
import "./login-button.css"
import logo from "../../../assets/logo-white.png";



interface ResetFormData {
  email: string;
  toggleForm: (type: "login" | "register" | "reset" | "redirect" | "otp") => void;
  setMessage: (message: string) => void;
}

const ResetForm: React.FC<ResetFormData> = ({toggleForm, setMessage}) => {
  const [formData, setFormData] = useState<Partial<ResetFormData>>({
    email: "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ResetFormData, string[]>>
  >({});

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const finalErrors: Partial<Record<keyof ResetFormData, string[]>> = {};

    if (!formData.email) {
      finalErrors.email = ["Email is required."];
    }

    setFormErrors(finalErrors);
    return Object.keys(finalErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        toggleForm("redirect");

        console.log("before calling the api")

        await dispatch(
          resetPasswordUser({
            email: formData.email as string,
          })
        ).unwrap();
        console.log("after calling the api")

      } catch (error) {
        if (typeof error === "string") {

          if (error.includes("User not found")) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              email: ["User with this email not found"],
            }));
          } else if (error.includes("An error occurred during sending email")) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              email: ["There is an error during sending email"],
            }));
          }

        } else if (error instanceof Error) {
          console.error(error.message || "An unknown error occurred");
          setMessage("An unknown error occurred");
          toggleForm("redirect");
        }
      }
    }
  };

  return (
    <div className="w-96 m-auto bg-widget border-solid border-inherit border-[1px] rounded-[10px] mt-10">

      <img className="mt-4 w-50 h-20 m-auto" src={logo} alt="Logo"/>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 pb-6 flex flex-col mx-12">
          <h3 className="text-xl font-bold">Reset Password</h3>

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
                  overlayClassName="custom-tooltip" //Class for changing the style of antd tooltips
                >
                  <FiAlertTriangle className="absolute left-3 text-red-500 top-[40%]"/>
                </Tooltip>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="login-animated-button bg-button text-black text-center mt-6 w-full py-4 font-bold text-base rounded"
          >
            Reset
          </button>

          <p className={"my-6  text-xs"}>
            Take me
            <a
              className="font-semibold ml-1 hover:underline hover:cursor-pointer inline-block"
              onClick={() => toggleForm("login")}
            > Back
            </a>
          </p>

        </div>
      </form>
    </div>
  );
};

export default ResetForm;
