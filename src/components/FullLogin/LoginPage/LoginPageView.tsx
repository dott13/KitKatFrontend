import React, {useState} from "react";
import LoginForm from "../LoginForms/LoginForm";
import RegisterForm from "../LoginForms/RegisterForm.tsx";
import ResetForm from "../LoginForms/ResetForm.tsx";
import LoginRedirect from "../LoginForms/LoginRedirect.tsx";


const LoginPageView: React.FC = () => {

  // const dispatch = useDispatch<AppDispatch>();
  const [activeForm, setActiveForm] = useState<"login"|"register"|"reset"|"redirect">("login")
  const [message, setMessage] = useState<string>("Check your email please");

  const toggleForm = (toggleType:"login"|"register"|"reset"|"redirect") => {
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
      default:
        return (
            <LoginForm toggleForm={toggleForm} email={""} password={""}/>
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
