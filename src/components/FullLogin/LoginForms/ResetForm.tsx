import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import OutlookIcon from "../../../assets/svgs/SvgExporter.tsx";
import { FiAlertTriangle } from "react-icons/fi";
import { Tooltip } from "antd";
import { resetPasswordUser} from "../../../redux/userSlice/userSlice.tsx";
import { AppDispatch } from "../../../redux/store/configureStore";
import { useDispatch } from "react-redux";

interface ResetFormData {
    email: string;
    toggleForm: () => void;
}

const ResetForm: React.FC<ResetFormData> = ({ toggleForm }) => {
    const [formData, setFormData] = useState<Partial<ResetFormData>>({
        email: "",
    });

    const [formErrors, setFormErrors] = useState<
        Partial<Record<keyof ResetFormData, string[]>>
    >({});

    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const finalErrors: Partial<Record<keyof ResetFormData, string[]>> = {};

        if (!formData.email) {
            finalErrors.email = ["Email is required."];
        }

        setFormErrors(finalErrors);
        return Object.keys(finalErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await dispatch(
                    resetPasswordUser({
                        email: formData.email as string,
                    })
                ).unwrap();

            } catch (error) {
                if (typeof error === "string") {

                    if(error.includes("User not found")){
                        setFormErrors((prevErrors) => ({
                            ...prevErrors,
                            email: ["User with this email not found."],
                        }));
                    }else if ( error.includes("An error occurred during sending email")){
                        setFormErrors((prevErrors) => ({
                            ...prevErrors,
                            email: ["There is an error during sending email"],
                        }));
                    }

                }else if (error instanceof Error) {
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        email: ["An unknown error occurred."],
                    }));
                    console.error(error.message || "An unknown error occurred.");
                }
            }
        }
    };

    return (
        <div className="w-96 m-auto bg-widget border-solid border-inherit border-[1px] rounded-[10px] mt-10">
            <h2 className="text-xl font-bold pt-6 text-center">Your Logo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-4 pb-6 flex flex-col mx-12">
                    <h3 className="text-xl font-bold">Log in</h3>

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
                                    formErrors.email ? "border-red-500" : "border-gray-300"
                                } rounded relative`}
                            />
                            {formErrors.email && (
                                <Tooltip
                                    title={formErrors.email[0]}
                                    placement="top"
                                    overlayClassName="custom-tooltip" //Class for changing the style of antds tooltips
                                >
                                    <FiAlertTriangle className="absolute left-3 text-red-500 top-[40%]" />
                                </Tooltip>
                            )}
                        </div>
                    </div>


                    <a className="mt-4 hover:underline inline-block text-sm hover:cursor-pointer">
                        Forgot Password?
                    </a>

                    <button
                        type="submit"
                        className="bg-button text-black text-center mt-6 w-full py-4 font-bold text-base rounded"
                    >
                        Log in
                    </button>

                    <p className="text-[13px] my-6 text-center">or continue with</p>
                    <div className="flex justify-center items-center">
                        <button className="bg-button w-36 py-3 mr-3 rounded">
                            <FcGoogle className="m-auto" size={24} />
                        </button>
                        <button className="bg-button w-36 py-3 ml-3 rounded">
                            <OutlookIcon className="m-auto" />
                        </button>
                    </div>
                    <p className="my-6 text-xs">
                        Don't have an account yet?
                        <a
                            className="font-semibold ml-1 hover:underline hover:cursor-pointer inline-block"
                            onClick={toggleForm}
                        >
                            Register here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ResetForm;