import React, { useState } from "react";
import LoginForm from "../LoginForms/LoginForm";
import RegisterForm from "../LoginForms/RegisterForm.tsx";
import ResetForm from "../LoginForms/ResetForm.tsx";

const LoginPageView: React.FC = () => {
  const [isLogIn, setIsLogIn] = useState<boolean>(true);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const toggleForm = (toggleType:string) => {
    if (toggleType === "reset") {
      setIsResetPassword(!isResetPassword);
    }else if (toggleType === "login") {
      setIsLogIn(!isLogIn);
    }
  };


  return (
      <div>
        {isLogIn ? (
            isResetPassword ? (
                <ResetForm toggleForm={toggleForm} email={""}/>
            ) : (
                <LoginForm toggleForm={toggleForm} email={""} password={""}/>
            )
        ) : (
            <RegisterForm
                toggleForm={toggleForm}
                email={""}
                password={""}
                confirmPassword={""}
            />
        )}
      </div>
  );
};

export default LoginPageView;
