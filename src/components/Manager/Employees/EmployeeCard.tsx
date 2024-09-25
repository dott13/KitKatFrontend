import { forwardRef } from "react";
import { BiUser } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiRadioButtonLine } from "react-icons/ri";

interface EmployeeCardProps {
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    seniority: string | null;
    city: string | null;
    role: string | null;
    skills: string[] | null;
    status: "Available" | "On Project" | null;
  };
  isOpen: boolean;
  onToggleStatus: () => void;
}

const EmployeeCard = forwardRef<HTMLDivElement, EmployeeCardProps>(
  ({ user, isOpen, onToggleStatus }, ref) => {
    const topSkills = user.skills?.slice(0, 3);

    // Extract and normalize country
    let country = user.city ? user.city.split(",").pop()?.trim() : null;
    if (country === "United States") {
      country = "US";
    }

    return (
      <div
        ref={ref}
        className="w-[18.5em] bg-white h-[10em] my-6 shadow-2xl rounded relative"
      >
        <div className="flex justify-between m-4 items-center">
          <BiUser color="black" size="24px" />
          <div className="flex flex-col">
            <p className="text-cardname text-sm font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-cardmail text-xs font-medium">{user.email}</p>
          </div>
          <PiDotsThreeVerticalBold
            className="text-dots cursor-pointer"
            size="24px"
            onClick={onToggleStatus}
          />
        </div>
        <div className="flex justify-between m-4 items-center text-center">
          <span
            className="mr-2 text-sm font-bold bg-widget px-2 py-1 flex-1 rounded truncate"
            title={`${user.seniority}`}
          >
            {user.seniority}
          </span>
          <span
            className="mr-2 text-sm font-bold bg-widget px-2 py-1 flex-1 rounded truncate"
            title={`${country}`}
          >
            {country}
          </span>
          <span
            className="mr-2 text-sm font-bold bg-widget px-2 py-1 flex-1 rounded truncate"
            title={`${user.role}`}
          >
            {user.role}
          </span>
        </div>
        <div className="flex justify-start m-4">
          {topSkills?.map((skill, index) => (
            <span
              key={index}
              className="mr-2 text-[0.625rem] text-black font-light bg-white border-widget border-[1px] px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
        {isOpen && (
          <div className="absolute right-0 top-8 bg-white border border-gray-300 p-2 rounded shadow-lg z-1 flex flex-col items-center">
            <div className="flex items-center">
              <RiRadioButtonLine
                className={`mr-2 ${
                  user.status === "On Project"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              />
              <p
                className={`mr-2 ${
                  user.status === "On Project"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {user.status === "On Project" ? "Assigned" : user.status}
              </p>
            </div>
            <button onClick={onToggleStatus} className="text-blue-500">
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default EmployeeCard;
