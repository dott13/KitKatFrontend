import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeListItem from "./EmployeeListItem";
import { FaFilter, FaListUl } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/configureStore";
import { getAllUser } from "../../../redux/userSlice/userSlice";
import { Spin } from "antd";

// Define filter options based on your backend data
const filterOptions = {
  countries: [
    { id: 1, name: "Romania" },
    { id: 2, name: "Moldova" },
    { id: 3, name: "USA" },
  ],
  seniorities: [
    { id: 1, name: "Junior" },
    { id: 2, name: "Middle" },
    { id: 3, name: "Senior" },
  ],
  positions: [
    { id: 1, name: "IT Technician" },
    { id: 2, name: "Backend Dev" },
    { id: 3, name: "Frontend Dev" },
  ],
  languages: [
    { id: 1, name: "English" },
    { id: 2, name: "Romanian" },
    { id: 3, name: "French" },
  ],
};

const EmployeesPageView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, totalPages, currentPage } = useSelector(
    (state: RootState) => state.user
  );

  const [view, setView] = useState<"card" | "list">("card");
  const [openUserId, setOpenUserId] = useState<number | null>(null);
  const usersPerPage = 9;

  // Updated filter state with comma-separated strings
  const [selectedFilters, setSelectedFilters] = useState({
    country: "",
    seniority: "",
    position: "",
    languages: "",
    roles: "",
  });

  // Dropdown visibility states
  const [showDropdowns, setShowDropdowns] = useState<{
    [key: string]: boolean;
  }>({
    country: false,
    seniority: false,
    position: false,
    language: false,
    status: false,
  });

  // Handle filter selection
  const handleFilterSelect = (filterType: string, value: string) => {
    setSelectedFilters((prev) => {
      // Get current filter values
      const currentFilterValues = prev[filterType as keyof typeof prev] || "";

      // Split current values
      const valuesArray = currentFilterValues
        ? currentFilterValues.split(",")
        : [];

      // Check if value is already selected
      const isSelected = valuesArray.includes(value);

      // Toggle selection
      const newValuesArray = isSelected
        ? valuesArray.filter((item) => item !== value)
        : [...valuesArray, value];

      // Join back to comma-separated string
      const newFilterValues = newValuesArray.join(",");

      return {
        ...prev,
        [filterType]: newFilterValues,
      };
    });
  };

  // Apply filters - called when filter icon is clicked
  const applyFilters = () => {
    dispatch(
      getAllUser({
        ...selectedFilters,
        page: 0,
        size: usersPerPage,
      })
    );
  };

  // Toggle dropdown visibility
  const toggleDropdown = (filterType: string) => {
    setShowDropdowns((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  // Initial load of users
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleToggleStatus = (id: number) => {
    setOpenUserId((prevId) => (prevId === id ? null : id));
  };

  // Handle pagination (if needed)
  const loadMoreUsers = () => {
    dispatch(
      getAllUser({
        ...selectedFilters,
        page: currentPage + 1,
        size: usersPerPage,
      })
    );
  };

  // Check if a filter is selected
  const isFilterSelected = (filterType: string, value: string) => {
    const currentValues =
      selectedFilters[filterType as keyof typeof selectedFilters] || "";
    return currentValues.split(",").includes(value);
  };

  return (
    <div className="px-[5%] py-[2%]">
      <div className="flex space-x-4 mb-4 justify-between relative">
        <button
          onClick={() =>
            setView((prevView) => (prevView === "list" ? "card" : "list"))
          }
          className="px-4 py-2 text-white rounded bg-widget shadow-xl"
        >
          {view === "card" ? <FaListUl /> : <HiMiniSquares2X2 />}
        </button>

        {/* Country Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("country")}
            className="px-4 py-2 rounded bg-filters font-bold"
          >
            Country
          </button>
          {showDropdowns.country && (
            <div className="absolute z-10 bg-white shadow-lg rounded mt-2">
              {filterOptions.countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleFilterSelect("country", country.name)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-black
                    ${
                      isFilterSelected("country", country.name)
                        ? "bg-blue-100"
                        : ""
                    }`}
                >
                  {country.name}
                  {isFilterSelected("country", country.name) && " ✓"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Seniority Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("seniority")}
            className="px-4 py-2 rounded bg-filters font-bold"
          >
            Seniority
          </button>
          {showDropdowns.seniority && (
            <div className="absolute z-10 bg-white shadow-lg rounded mt-2">
              {filterOptions.seniorities.map((seniority) => (
                <button
                  key={seniority.id}
                  onClick={() =>
                    handleFilterSelect("seniority", seniority.name)
                  }
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-black
                    ${
                      isFilterSelected("seniority", seniority.name)
                        ? "bg-blue-100"
                        : ""
                    }`}
                >
                  {seniority.name}
                  {isFilterSelected("seniority", seniority.name) && " ✓"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Position Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("position")}
            className="px-4 py-2 rounded bg-filters font-bold"
          >
            Position
          </button>
          {showDropdowns.position && (
            <div className="absolute z-10 bg-white shadow-lg rounded mt-2">
              {filterOptions.positions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => handleFilterSelect("position", position.name)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-black
                    ${
                      isFilterSelected("position", position.name)
                        ? "bg-blue-100"
                        : ""
                    }`}
                >
                  {position.name}
                  {isFilterSelected("position", position.name) && " ✓"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("language")}
            className="px-4 py-2 rounded bg-filters font-bold"
          >
            Language
          </button>
          {showDropdowns.language && (
            <div className="absolute z-10 bg-white shadow-lg rounded mt-2">
              {filterOptions.languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => handleFilterSelect("languages", language.name)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-black
                    ${
                      isFilterSelected("languages", language.name)
                        ? "bg-blue-100"
                        : ""
                    }`}
                >
                  {language.name}
                  {isFilterSelected("languages", language.name) && " ✓"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("status")}
            className="px-4 py-2 rounded bg-filters font-bold"
          >
            Status
          </button>
          {showDropdowns.status && (
            <div className="absolute z-10 bg-white shadow-lg rounded mt-2">
              {["ACTIVE", "INACTIVE"].map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => handleFilterSelect("roles", statusOption)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-black
                    ${
                      isFilterSelected("roles", statusOption)
                        ? "bg-blue-100"
                        : ""
                    }`}
                >
                  {statusOption}
                  {isFilterSelected("roles", statusOption) && " ✓"}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={applyFilters}
          className="px-4 py-2 rounded bg-filters font-bold shadow-xl"
        >
          <FaFilter />
        </button>
      </div>

      {status === "loading" ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {view === "card" ? (
            <div className="flex flex-wrap justify-between gap-4 box-border">
              {list.map((user) => (
                <EmployeeCard
                  key={user.id}
                  user={user}
                  isOpen={openUserId === user.id}
                  onToggleStatus={() => handleToggleStatus(user.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {list.map((user) => (
                <EmployeeListItem key={user.id} user={user} />
              ))}
            </div>
          )}

          {currentPage < totalPages - 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreUsers}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeesPageView;
