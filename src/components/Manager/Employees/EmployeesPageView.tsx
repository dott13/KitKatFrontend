import React, { useState, useRef, useCallback, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
const mockUsers = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  email: `user${index + 1}@example.com`,
  jobTitle: `Job Title ${index + 1}`,
  language: `German`,
  skills: [
    index % 2 === 0 ? "React" : "Angular",
    index % 3 === 0 ? "VueJS" : "NodeJS",
    "JavaScript",
  ],
}));
const EmployeesPageView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      {users.map((user, index) => {
        if (index === users.length - 1) {
          return <EmployeeCard ref={lastUserRef} key={user.id} user={user} />;
        } else {
          return <EmployeeCard key={user.id} user={user} />;
        }
      })}
      {loading && <div>Loading more users...</div>}
      {!hasMore && <div>No more users to load.</div>}
    </div>
  );
};

export default EmployeesPageView;
