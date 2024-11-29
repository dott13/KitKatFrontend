import React from "react";


const UnauthorizedPage: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500">
          403 - No Access
        </h1>
      </div>

    </>
  );
};

export default UnauthorizedPage;
