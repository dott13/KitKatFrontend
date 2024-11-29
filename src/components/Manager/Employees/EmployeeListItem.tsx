import { forwardRef } from "react";
import { RiRadioButtonLine } from "react-icons/ri";

interface EmployeeListItemProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
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
    languages?: Array<{
      languageId: number;
      languageName: string;
    }>;
    status?: { name: string };
  };
}

const EmployeeListItem = forwardRef<HTMLDivElement, EmployeeListItemProps>(
  ({ user }, ref) => {
    // Extract country
    const country = user.city?.country?.countryName || "Unknown";

    return (
      <div
        ref={ref}
        className="flex justify-between my-2 p-4 bg-white rounded shadow-xl text-black items-center box-border font-bold"
      >
        <div className="flex">
          <div>
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-cardmail font-medium">{user.email}</p>
          </div>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>{country}</p>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>{user.seniority?.name}</p>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>{user.role?.name}</p>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>
            {user.languages && user.languages.length > 0
              ? user.languages.map((lang) => lang.languageName).join(", ")
              : "No languages specified"}
          </p>
        </div>
        <div className="flex items-center rounded border-2 border-widget p-3 mr-20">
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
      </div>
    );
  }
);

export default EmployeeListItem;
