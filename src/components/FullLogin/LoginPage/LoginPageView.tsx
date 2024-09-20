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
  const [email, setEmail] = useState<string>("");

  const toggleForm = (toggleType:"login"|"register"|"reset"|"redirect"|"otp") => {
    setActiveForm(toggleType);
  };

  const renderForm = () =>{
    switch (activeForm){
      case "register":
        return (
            <RegisterForm toggleForm={toggleForm} setEmail={(email)=>setEmail(email)} email={""} password={""} confirmPassword={""}/>
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
        <LoginOTPForm otpCode={""} email={email} toggleForm={toggleForm}  />

        )
      default:
        return (
          <LoginForm toggleForm={toggleForm} setEmail={(email)=>setEmail(email)} email={""} password={""}/>
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

