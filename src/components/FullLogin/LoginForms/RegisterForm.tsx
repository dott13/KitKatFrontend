import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import OutlookIcon from "../../../assets/svgs/SvgExporter";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../../redux/userSlice/userSlice"; // Import the actions
import { AppDispatch } from "../../../redux/store/configureStore";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}
//Function to validate the password by policy made in jira ticket
const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  const passwordPolicy = [
    { regex: /[a-z]/, message: "Include lower-case letter(s) [a-z]" },
    { regex: /[A-Z]/, message: "Include upper-case letter(s) [A-Z]" },
    { regex: /[0-9]/, message: "Include numbers [0-9]" },
    {
      regex: /[!@#$%^&*()_+{}[\]:;"'<>,.?/~|\\-]/,
      message: "Include symbols [!@#$%^&*()...]",
    },
    { regex: /.{8,}/, message: "Make it at least 8 characters long." },
  ];

  passwordPolicy.forEach((rule) => {
    if (!rule.regex.test(password)) {
      errors.push(rule.message);
    }
  });

  return errors;
};

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

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
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();

        // Dispatch login action after successful registration
        const resultAction = await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();

        // Store JWT token in localStorage
        localStorage.setItem("token", resultAction.token);

        // Redirect to home page
        navigate("/dashboard");
      } catch (error) {
        // Handle errors from registration or login
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
          <h3 className="text-xl font-bold">Register</h3>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full px-3 py-1 mt-2 text-sm border text-black ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email[0]}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm">
              Password:
            </label>
            <div
              className={`px-3 py-1 mt-2 border flex justify-between items-center ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              } rounded bg-gray-50`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="text-sm text-black bg-gray-50 focus:border-none focus:outline-none"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaRegEyeSlash className="text-gray-500" />
                ) : (
                  <FaRegEye className="text-gray-500" />
                )}
              </div>
            </div>
            {formErrors.password && (
              <ul className="text-red-500 text-sm mt-1 list-disc pl-5">
                {formErrors.password.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="confirmPassword" className="block text-sm">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`w-full px-3 py-1 mt-2 border text-sm text-black ${
                formErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded`}
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.confirmPassword[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-button text-black text-center mt-8 w-full py-4 font-bold text-base rounded"
          >
            Register
          </button>
          <p className="text-[13px] my-6 text-center">or continue with</p>
          <div className="flex justify-center items-center mb-6">
            <button className="bg-button w-36 py-3 mr-3 rounded">
              <FcGoogle className="m-auto" size={24} />
            </button>
            <button className="bg-button w-36 py-3 ml-3 rounded">
              <OutlookIcon className="m-auto" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
