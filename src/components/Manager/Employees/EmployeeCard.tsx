import { forwardRef } from "react";
import { BiUser } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiRadioButtonLine } from "react-icons/ri";

interface EmployeeCardProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    position?: { name: string };
    seniority?: { name: string };
    city?: { cityName: string; country: { countryName: string } };
    role?: { name: string };
    skillRating?: Array<{
      skill: {
        name: string;
        skillType: {
          name: string;
        };
      };
    }>;
    status?: { name: string };
  };
  isOpen: boolean;
  onToggleStatus: () => void;
}

const EmployeeCard = forwardRef<HTMLDivElement, EmployeeCardProps>(
  ({ user, isOpen, onToggleStatus }, ref) => {
    // Extract top skills (adjust based on actual skill structure)
    const topSkills = user.skillRating
      ?.slice(0, 3)
      .map((skillRating) => skillRating.skill.name);

    // Extract country
    const country = user.city?.country?.countryName || "Unknown";

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
            title={user.seniority?.name}
          >
            {user.seniority?.name}
          </span>
          <span
            className="mr-2 text-sm font-bold bg-widget px-2 py-1 flex-1 rounded truncate"
            title={country}
          >
            {country}
          </span>
          <span
            className="mr-2 text-sm font-bold bg-widget px-2 py-1 flex-1 rounded truncate"
            title={user.position?.name}
          >
            {user.position?.name}
          </span>
        </div>
        <div className="flex justify-start m-4">
          {topSkills?.map((skill: string, index: number) => (
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
                  user.status?.name === "INACTIVE"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              />
              <p
                className={`mr-2 ${
                  user.status?.name === "INACTIVE"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {user.status?.name}
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
