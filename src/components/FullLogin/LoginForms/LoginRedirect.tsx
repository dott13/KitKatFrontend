import React from "react";
import "./login-button.css"
import logo from "../../../assets/logo-white.png";



interface LoginRedirectData {
  message: string;
  toggleForm: (toggleType: "login" | "register" | "reset" | "redirect") => void;
}

const ResetForm: React.FC<LoginRedirectData> = ({toggleForm, message}) => {

  return (
    <div className="w-96 m-auto mt-10">
      <img className="mt-4 w-50 h-20 m-auto" src={logo} alt="Logo"/>

      <div className="mt-4 pb-6 flex flex-col mx-12">
        <h3 className="text-regular text-widget font-extralight text-center">{message}</h3>
        <button
          type="submit"
          className="redirect-animated-button bg-black text-white text-center mt-6 w-full py-4 font-bold text-base rounded"
          onClick={() => toggleForm("login")}
        >
          Get Back
        </button>
      </div>
    </div>
  );
};

export default ResetForm;
