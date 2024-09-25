import { forwardRef } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import { languageMap } from "../../../utils/languages";

interface EmployeeListItemProps {
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    seniority: string | null;
    city: string | null;
    role: string | null;
    skills: string[] | null;
    languages: string[] | null; // Keep it as a string array
    status: string | null;
  };
}

const EmployeeListItem = forwardRef<HTMLDivElement, EmployeeListItemProps>(
  ({ user }, ref) => {
    // Extract and normalize country
    let country = user.city ? user.city.split(",").pop()?.trim() : null;
    if (country === "United States") {
      country = "US";
    }

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
          <p>{user.seniority}</p>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>{user.role}</p>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>
            {user.languages && user.languages.length > 0
              ? user.languages
                  .map((lang) => languageMap[lang] || lang)
                  .join(", ") // Convert to abbreviation
              : "No languages specified"}{" "}
            {/* Default message */}
          </p>
        </div>
        <div className="flex items-center rounded border-2 border-widget p-3 mr-20">
          <RiRadioButtonLine
            className={`mr-2 ${
              user.status === "On Project" ? "text-red-500" : "text-green-500"
            }`}
          />
          <p
            className={`mr-2 ${
              user.status === "On Project" ? "text-red-500" : "text-green-500"
            }`}
          >
            {user.status === "On Project" ? "Assigned" : user.status}
          </p>
        </div>
      </div>
    );
  }
);

export default EmployeeListItem;
