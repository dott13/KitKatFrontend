import React, { useRef, useState} from "react";
import {loginOTPUser} from "../../../redux/userSlice/userSlice.tsx";
import {AppDispatch} from "../../../redux/store/configureStore";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./login-button.css"


interface LoginOTPFormData {
  email: string;
  otpCode: string;
}
const LoginOTPForm: React.FC<LoginOTPFormData> = ({email}) => {
  const [formData, setFormData] = useState<Partial<LoginOTPFormData>>({
    otpCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);



  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof LoginOTPFormData, string[]>>
  >({});


  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Hook for navigation


  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];


  const resetCode = () => {
    inputRefs.forEach(ref => {
      ref!.current.value = '';
    });
    inputRefs[0].current.focus();

    setFormData({
      otpCode: ""
    });
  }



  function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    // Update code state with single digit
    const newCode = [...formData.otpCode as string];
    // Convert lowercase letters to uppercase
    if (/^[a-z]+$/.test(input.value)) {
      const uc = input.value.toUpperCase();
      newCode[index] = uc;
      inputRefs[index].current.value = uc;
    } else {
      newCode[index] = input.value;
    }
    setFormData({
      otpCode: newCode.join('')
    });

    input.select();

    if (input.value === '') {
      // If the value is deleted, select previous input, if exists
      if (previousInput) {
        previousInput.current.focus();
      }
    } else if (nextInput) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }
  }


  function handleFocus(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.select();
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedCode = e.clipboardData.getData('text');
    if (pastedCode.length === 6) {
      setFormData({
        otpCode: pastedCode
      });
      inputRefs.forEach((inputRef, index) => {
        inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isLoading) return;
    setIsLoading(true)

    e.preventDefault();

      try {

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

  const handleClear = (e: React.FormEvent) =>{
    e.preventDefault();


    resetCode();

  }

  return (
    <div className="w-96 m-auto bg-widget border-solid border-inherit border-[1px] rounded-[10px] mt-10">
      <h2 className="text-xl font-bold pt-6 text-center">Your Logo</h2>

      <div className="mt-4 pb-6 flex flex-col mx-12">

        <h3 className="text-xl font-bold">Verification Code</h3>
        <p>We have sent the verification code to your email address.</p>

        <div className="mt-4 flex gap-2 relative">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              className={`text-2xl bg-gray-800 w-10 flex p-2 text-center ${
                  formErrors.otpCode ? "border-red-500" : "border-gray-300"
                } rounded `}
              key={index}
              type="text"
              maxLength={1}
              onChange={(e) => handleInput(e, index)}
              ref={inputRefs[index]}
              autoFocus={index === 0}
              onFocus={handleFocus}
              // onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isLoading}
            />
          ))}
        </div>

        {
          !(formData.otpCode?.length === 6)
            ?
            <button
              className="login-animated-button bg-button text-black text-center mt-6 w-full py-4 font-bold text-base rounded "
              onClick={handleClear}
            >
              Clear
            </button>
            :
            <button
              type="submit"
              className="login-animated-button bg-button text-black text-center mt-6 w-full py-4 font-bold text-base rounded "
              onClick={handleSubmit}
            >
              Submit
            </button>
        }

        {/*<div className="mt-4">*/}
        {/*  <div className="relative flex items-center">*/}
        {/*    <input*/}
        {/*      type={"text"}*/}
        {/*      name="otpCode"*/}
        {/*      id="otpCode"*/}
          {/*      value={formData.otpCode}*/}
          {/*      maxLength={20}*/}
          {/*      onChange={handleChange}*/}
          {/*      placeholder="000000"*/}
          {/*      className={`w-full pl-10 pr-3 py-1 mt-2 text-sm text-black border ${*/}
          {/*        formErrors.otpCode ? "border-red-500" : "border-gray-300"*/}
          {/*      } rounded relative`}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}



        </div>
      </div>
      );
      };

      export default LoginOTPForm;
