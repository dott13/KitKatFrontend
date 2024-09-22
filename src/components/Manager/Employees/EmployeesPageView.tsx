import React, { useState, useRef, useCallback, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import { FaFilter, FaListUl } from "react-icons/fa";
const mockUsers = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  email: `user${index + 1}@example.com`,
  jobTitle: `Job Title ${index + 1}`,
  language: `German`,
  seniority: index % 2 === 0 ? "Junior" : "Senior",
  skills: [
    index % 2 === 0 ? "React" : "Angular",
    index % 3 === 0 ? "VueJS" : "NodeJS",
    "JavaScript",
  ],
  status: index % 2 === 0 ? false : true,
}));
const EmployeesPageView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [openUserId, setOpenUserId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadUsers = () => {
    if (!hasMore) return;
    setLoading(true);

    const usersPerPage = 9;
    const newUsers = mockUsers.slice(
      (page - 1) * usersPerPage,
      page * usersPerPage
    );

    if (newUsers.length > 0) {
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  const lastUserRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadUsers();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleToggleStatus = (id: number) => {
    setOpenUserId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-4">
      {/* Button Section */}
      <div className="flex space-x-4 mb-4 justify-between">
        <button className="px-4 py-2 text-white rounded bg-widget shadow-xl">
          <FaListUl />
        </button>
        <button className="px-4 py-2 rounded bg-filters font-bold">
          Country
        </button>
        <button className="px-4 py-2 rounded bg-filters font-bold">
          Seniority
        </button>
        <button className="px-4 py-2 rounded bg-filters font-bold">
          Position
        </button>
        <button className="px-4 py-2 rounded bg-filters font-bold">
          Language
        </button>
        <button className="px-4 py-2 rounded bg-filters font-bold">
          Status
        </button>
        <button className="px-4 py-2 rounded bg-filters font-bold shadow-xl">
          <FaFilter />
        </button>
      </div>
      <div className="flex flex-wrap justify-between gap-4 box-border">
        {users.map((user, index) => {
          if (index === users.length - 1) {
            return (
              <EmployeeCard
                ref={lastUserRef}
                key={user.id}
                user={user}
                isOpen={openUserId === user.id}
                onToggleStatus={() => handleToggleStatus(user.id)}
              />
            );
          } else {
            return (
              <EmployeeCard
                key={user.id}
                user={user}
                isOpen={openUserId === user.id}
                onToggleStatus={() => handleToggleStatus(user.id)}
              />
            );
          }
        })}
        {loading && <div>Loading more users...</div>}
        {!hasMore && <div>No more users to load.</div>}
      </div>
    </div>
  );
};

export default EmployeesPageView;
