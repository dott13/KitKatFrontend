import React, { useState} from "react";
import {loginOTPUser} from "../../../redux/userSlice/userSlice.tsx";
import {AppDispatch} from "../../../redux/store/configureStore";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./login-button.css"


interface LoginOTPFormData {
  email: string;
  otpCode: string;
  toggleForm: (toggleType: "login" | "register" | "reset" | "redirect"| "otp") => void;
}
const LoginOTPForm: React.FC<LoginOTPFormData> = ({email, toggleForm}) => {
  const [formData, setFormData] = useState<Partial<LoginOTPFormData>>({
    otpCode: "******",
  });
  const [isLoading, setIsLoading] = useState(false);


  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof LoginOTPFormData, string[]>>
  >({});


  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Hook for navigation


  const resetCode = () => {
    setFormData({ otpCode: "" });
  };


  function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target;
    const currentCode = formData.otpCode || "";
    const newCodeArray = currentCode.split("");

    if (input.value === "" || /^[a-z]$/.test(input.value)) {
      newCodeArray[index] = "*";
    } else {

      newCodeArray[index] = input.value;
      if (index < 5) {

        changeFocus(index+1)

      }
    }

    setFormData({ otpCode: newCodeArray.join("") }); // Update the form data
    input.select(); // Select the current input


  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only digits (0-9) and prevent other characters
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  const changeFocus = (index:number)=>{
    setTimeout(() => {
      const nextInput = document.querySelector(`input[data-index='${index}']`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }, 0);
  }

  function handleFocus(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.select();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    const currentCode = formData.otpCode || ""; // Get the current OTP code
    const input = e.target;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if ((e.key === "Backspace" || e.key === "Delete") && input.value === '') {

      const newCode = currentCode.split("");
      newCode[index] = "*";
      setFormData({ otpCode: newCode.join("") });

      // Focus the previous input if it exists
      if (index >= 1) {
        changeFocus(index-1);
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedCode = e.clipboardData.getData('text');

    if (pastedCode.length === 6) {
      const newOtpCode = pastedCode.split("");

      setFormData({
        otpCode: newOtpCode.join("")
      });

      newOtpCode.forEach((char, index) => {
        const inputField = document.getElementById(`otp-input-${index}`)as HTMLInputElement;
        if (inputField) {
          inputField.value = char;
        }
      });

    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isLoading) return;
    setIsLoading(true)

    e.preventDefault();

      try {
        console.log(formData.otpCode)
        const response = await dispatch(
          loginOTPUser({
            email: email,
            verificationCode: formData.otpCode as string ,
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
              otpCode: ["User not found"],
            }));
          } else if (error.includes("Incorrect password")) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              otpCode: ["Incorrect password. Try again."],
            }));
          } else {
            console.error("Error during login:", error);
          }
        }
      }finally {
        setIsLoading(false);
      }

  };



  return (
    <div className="w-96 m-auto bg-widget border-solid border-inherit border-[1px] rounded-[10px] mt-10">
      <h2 className="text-xl font-bold pt-6 text-center">Your Logo</h2>

      <div className="mt-4 pb-6 flex flex-col mx-12">
        <h3 className="text-xl font-bold">Verification Code</h3>
        <p className="mt-4 block text-sm">We have sent the verification code to your email address.</p>

        <div className="mt-4 flex gap-2 relative">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              id={`otp-input-${index}`}
              className={`text-2xl bg-white w-10 flex p-2 text-center text-black ${
                formErrors.otpCode ? "border-red-500" : "border-gray-300"
              } rounded `}
              key={index}
              type="text"
              placeholder={"*"}
              maxLength={1}
              onChange={(e) => handleInput(e, index)}
              data-index={index}
              autoFocus={index === 0}
              onFocus={handleFocus}
              onPaste={handlePaste}
              onKeyPress={handleKeyPress}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={isLoading}
            />
          ))}
        </div>

        <p className={"mt-4  text-xs"}>
          Take me
          <a
            className="font-semibold ml-1 hover:underline hover:cursor-pointer inline-block"
            onClick={() => toggleForm("login")}
          > Back
          </a>
        </p>

        {
          formData.otpCode === "******"
            ?
            <button
              className="mb-6 login-animated-button bg-button text-black text-center mt-6 w-full py-4 font-bold text-base rounded "
              onClick={resetCode}
            >
              Clear
            </button>
            :
            <button
              type="submit"
              className="mb-6 login-animated-button bg-button text-black text-center mt-6 w-full py-4 font-bold text-base rounded "
              onClick={handleSubmit}
            >
              Submit
            </button>
        }


      </div>
    </div>
  );
};

export default LoginOTPForm;
