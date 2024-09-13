import React, {useState} from "react";
import LoginForm from "../LoginForms/LoginForm";
import RegisterForm from "../LoginForms/RegisterForm.tsx";



const LoginPageView: React.FC = () => {

  const [isLogIn, setIsLogIn] = useState<boolean>(true)

  const toggleLogIn = () => {
    setIsLogIn(!isLogIn)
  }

  return (
      <div>
        {isLogIn ?  (<LoginForm toggleForm={toggleLogIn} email={""} password={""}/>):(<RegisterForm />)}

      </div>
  )
};

export default LoginPageView;

