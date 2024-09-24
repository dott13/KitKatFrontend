// UserListItem.tsx
import { forwardRef } from "react";
import { RiRadioButtonLine } from "react-icons/ri";

interface EmployeeListItemProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    seniority: string;
    country: string;
    jobTitle: string;
    skills: string[];
    language: string;
    status: boolean;
  };
}
//Design for all the items in the list part
const EmployeeListItem = forwardRef<HTMLDivElement, EmployeeListItemProps>(
  ({ user }, ref) => {
    return (
      <div
        ref={ref}
        className="flex justify-between my-2 p-4 bg-white rounded shadow-xl text-black items-center box-border font-bold"
      >
        <div className="flex ">
          <div>
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-cardmail font-medium">{user.email}</p>
          </div>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>{user.country}</p>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>{user.seniority}</p>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>{user.jobTitle}</p>
        </div>
        <div className="text-black rounded border-2 border-widget p-3">
          <p>{user.language}</p>
        </div>
        <div className="flex items-center rounded border-2 border-widget p-3 mr-20">
          <RiRadioButtonLine
            className={`mr-2 ${
              user.status ? "text-red-500" : "text-green-500"
            }`}
          />
          <p
            className={`mr-2 ${
              user.status ? "text-red-500" : "text-green-500"
            }`}
          >
            {user.status ? "Assigned" : "Available"}
          </p>
        </div>{" "}
      </div>
    );
  }
);

export default EmployeeListItem;
