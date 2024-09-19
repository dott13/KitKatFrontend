import { Tooltip } from "antd";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import OutlookIcon from "../../../assets/svgs/SvgExporter";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../../redux/userSlice/userSlice"; // Import the actions
import { AppDispatch } from "../../../redux/store/configureStore";
import { FiAlertTriangle } from "react-icons/fi";
import "./login-button.css"


interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  toggleForm: (toggleType:"login"|"register"|"reset"|"redirect") => void;
}

interface RegisterFormErrors {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}
//Function to validate the password by policy made in jira ticket
const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  // Allowed symbols
  const validSymbols = /[!@#$%^&*()_+[\]/~\\-]/;

  // Regex to detect forbidden symbols (anything that is not a-z, A-Z, 0-9, or allowed symbols)
  // eslint-disable-next-line no-useless-escape
  const forbiddenSymbols = /[^a-zA-Z0-9!@#$%^&*()_+\[\]\/~\\-]/;

  // Password policy rules
  const passwordPolicy = [
    { regex: /[a-z]/, message: "Include lower-case letter(s) [a-z]" },
    { regex: /[A-Z]/, message: "Include upper-case letter(s) [A-Z]" },
    { regex: /[0-9]/, message: "Include numbers [0-9]" },
    { regex: validSymbols, message: "Include symbols [!@#$%^&*()...]" },
    { regex: /.{8,}/, message: "Make it at least 8 characters long." },
  ];

  // Check for missing required criteria
  passwordPolicy.forEach((rule) => {
    if (!rule.regex.test(password)) {
      errors.push(rule.message);
    }
  });

  // Check for forbidden symbols
  if (forbiddenSymbols.test(password)) {
    errors.push(
      "Your password contains forbidden symbols. Only the following symbols are allowed: !@#$%^&*()_+[]/~\\-"
    );
  }

  return errors;
};

const RegisterForm: React.FC<RegisterFormData> = ({ toggleForm }) => {
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});
  const [backendErrors, setBackendErrors] = useState<string | null>(null);

  //Dispatch Hook from redux to get information from our slices in the store
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    const newErrors: RegisterFormErrors = {};
    //Errors when pressing the register button without adding anything
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = ["A valid email is required."];
      }
    }

    if (name === "password") {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors;
      }

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = ["Passwords do not match."];
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = ["Passwords do not match."];
      }
    }

    setFormErrors(newErrors);
  };

  const validateForm = () => {
    const finalErrors: RegisterFormErrors = {};

    if (!formData.email) {
      finalErrors.email = ["Email is required."];
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      finalErrors.email = ["A valid email is required."];
    }

    if (!formData.password) {
      finalErrors.password = ["Password is required."];
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        finalErrors.password = passwordErrors;
      }
    }

    if (!formData.confirmPassword) {
      finalErrors.confirmPassword = ["Confirm Password is required."];
    } else if (formData.confirmPassword !== formData.password) {
      finalErrors.confirmPassword = ["Passwords do not match."];
    }

    setFormErrors(finalErrors);

    return Object.keys(finalErrors).length === 0;
  };

  //Function for submiting and POSTing the data to the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      //this part is for dispatching or fetching the backend api request for registring
      //registerUser is made in our userSlice that is parsed to the redux store
      try {
        // Dispatch registration action
        await dispatch(
          registerUser({
            email: formData.email as string,
            password: formData.password as string,
          })
        ).unwrap();

        // Dispatch login action after successful registration
        const resultAction = await dispatch(
          loginUser({
            email: formData.email as string,
            password: formData.password as string,
          })
        ).unwrap();

        // Store JWT token in localStorage
        localStorage.setItem("token", resultAction.token);
        localStorage.setItem("isLoggedIn", String(true));

        // Redirect to home page
        navigate("/dashboard");
      } catch (error) {
        // Check if the error has a string message (from thunkAPI.rejectWithValue)
        if (typeof error === "string") {
          if (error.includes("There is already")) {
            // Error from backend: User already exists
            setBackendErrors("There is already an account with this email");
          } else {
            // Generic error message
            setBackendErrors("An error occurred. Please try again.");
          }
        } else if (error instanceof Error) {
          // Handle errors as instances of Error (just in case)
          setBackendErrors(error.message || "An unknown error occurred.");
        } else {
          console.error("Unknown error:", error);
          setBackendErrors("An unknown error occurred.");
        }
      }
    }
  };

  //Function to get both errors for not having an email and the backend part of email validation
  const getEmailErrorTooltipContent = () => {
    // Merge frontend validation errors with backend errors
    const errors = formErrors.email ? [...formErrors.email] : [];
    if (backendErrors) {
      errors.push(backendErrors);
    }
    return errors.join(", ");
  };

  //Function to make the password errors as an unorganized list so we can see them more clearly
  //and without it being so chaotic
  const getPasswordErrorTooltipContent = () => {
    return (
      <ul className="list-disc list-inside">
        {formErrors.password?.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-96 m-auto bg-widget border-solid border-inherit border-[1px] rounded-[10px] mt-10">
      <h2 className="text-xl font-bold pt-6 text-center">Your Logo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 pb-6 flex flex-col mx-12">
          <h3 className="text-xl font-bold">Register</h3>
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
                  formErrors.email || backendErrors
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded relative`}
              />
              {(formErrors.email || backendErrors) && (
                <Tooltip
                  title={getEmailErrorTooltipContent}
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
                maxLength={20}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full pl-10 pr-3 py-1 mt-2 text-sm text-black border ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                } rounded relative`}
              />
              {formErrors.password && (
                <Tooltip
                  title={getPasswordErrorTooltipContent}
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

          <div className="mt-4">
            <label htmlFor="confirmPassword" className="block text-sm">
              Confirm Password:
            </label>
            <div className="relative flex items-center">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                maxLength={20}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full pl-10 pr-3 py-1 mt-2 text-sm border text-black ${
                  formErrors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded relative`}
              />
              {formErrors.confirmPassword && (
                <Tooltip
                  title={formErrors.confirmPassword[0]}
                  placement="top"
                  overlayClassName="custom-tooltip"
                >
                  <FiAlertTriangle className="absolute left-3 text-red-500 top-[40%]" />
                </Tooltip>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="login-animated-button bg-button text-black text-center mt-8 w-full py-4 font-bold text-base rounded"
          >
            Register
          </button>
          <p className="text-[13px] my-6 text-center">or continue with</p>
          <div className="flex justify-center items-center mb-6">
            <button className="login-animated-button bg-button w-36 py-3 mr-3 rounded">
              <FcGoogle className="m-auto" size={24} />
            </button>
            <button className="login-animated-button bg-button w-36 py-3 ml-3 rounded">
              <OutlookIcon className="m-auto" />
            </button>
          </div>
          <div className="flex m-auto">
            <p className="text-xs text-center">Already Have an Account?</p>
            <a
              className="text-xs text-center font-semibold hover:underline hover:cursor-pointer pl-1"
              onClick={() => toggleForm("login")}
            >
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
