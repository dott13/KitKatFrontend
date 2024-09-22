import React, { forwardRef } from "react";

interface EmployeeCardProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    seniority: string;
    language: string;
    jobTitle: string;
    skills: string[];
  };
}

const EmployeeCard = forwardRef<HTMLDivElement, EmployeeCardProps>(
  ({ user }, ref) => {
    return <div ref={ref}>carticica</div>;
  }
);

export default EmployeeCard;
