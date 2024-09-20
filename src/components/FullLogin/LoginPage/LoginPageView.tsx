import React, {useState} from "react";
import LoginForm from "../LoginForms/LoginForm";
import RegisterForm from "../LoginForms/RegisterForm.tsx";
import ResetForm from "../LoginForms/ResetForm.tsx";
import LoginRedirect from "../LoginForms/LoginRedirect.tsx";
import LoginOTPForm from "../LoginForms/LoginOTP.tsx";



const LoginPageView: React.FC = () => {

  // const dispatch = useDispatch<AppDispatch>();
  const [activeForm, setActiveForm] = useState<"login"|"register"|"reset"|"redirect"|"otp">("login")
  const [message, setMessage] = useState<string>("Check your email please");

  const toggleForm = (toggleType:"login"|"register"|"reset"|"redirect"|"otp") => {
    setActiveForm(toggleType);
  };

  const renderForm = () =>{
    switch (activeForm){
      case "register":
        return (
            <RegisterForm toggleForm={toggleForm} email={""} password={""} confirmPassword={""}/>
        )
      case "reset":
        return (
            <ResetForm toggleForm={toggleForm} setMessage={(message)=> {setMessage(message)}} email={""}/>
        )
      case "redirect":
        return (
            <LoginRedirect toggleForm={toggleForm} message={message}  />
        )
      case "otp":
        return (
          <LoginForm toggleForm={toggleForm} email={""} password={""}/>

        )
      default:
        return (
          <LoginOTPForm email={""} otpCode={""}  />
          //eu aici o sa schimb sa fie login , prosta am pus sa nu ma fut de fiecare data sa fac login

        )
    }
  }


  return (
    <div>
      {
        renderForm()
      }
    </div>
  );
};

export default LoginPageView;

