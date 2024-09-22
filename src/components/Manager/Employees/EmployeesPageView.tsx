import React, { useState, useRef, useCallback, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeListItem from "./EmployeeListItem";
import { FaFilter, FaListUl } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
//mockup for future (no api yet :( )
const mockUsers = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  email: `user${index + 1}@example.com`,
  jobTitle: `Job Title ${index + 1}`,
  country: `Germany`,
  seniority: index % 2 === 0 ? "Junior" : "Senior",
  skills: [
    index % 2 === 0 ? "React" : "Angular",
    index % 3 === 0 ? "VueJS" : "NodeJS",
    "JavaScript",
  ],
  language: `German`,
  status: index % 2 === 0 ? false : true,
}));

const EmployeesPageView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [view, setView] = useState<"card" | "list">("card");
  const [openUserId, setOpenUserId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  //function to load users infinitly and smooth
  const loadUsers = () => {
    if (!hasMore) return;
    setLoading(true);
    //Mostly for first run changable for responsive view
    const usersPerPage = 9;
    const newUsers = mockUsers.slice(
      (page - 1) * usersPerPage,
      page * usersPerPage
    );
    //We set the users we got on the passage, if there are no newUsers just get the previous users add the new ones to the queue
    if (newUsers.length > 0) {
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      //also change the page
      setPage(page + 1);
    } else {
      //this to false so it doesnt load if the user doesnt see
      setHasMore(false);
    }

    setLoading(false);
  };
  // With this we know where the last user is and when to load the next page with them so it doesnt overload the web app
  const lastUserRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      //We have the observer from IntersectionObserver to know if the last user has been updated to new one or no
      observer.current = new IntersectionObserver((entries) => {
        //Now if the new one and the old one intersects it will load new portion of users
        if (entries[0].isIntersecting && hasMore) {
          loadUsers();
        }
      });
      //change the node of the observation to see the new entries and so on
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleToggleStatus = (id: number) => {
    setOpenUserId((prevId) => (prevId === id ? null : id));
  };
  //first load of the users
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4 justify-between">
        <button
          onClick={() =>
            setView((prevView) => (prevView === "list" ? "card" : "list"))
          }
          className="px-4 py-2 text-white rounded bg-widget shadow-xl"
        >
          {view === "card" ? <FaListUl /> : <HiMiniSquares2X2 />}
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

      {view === "card" ? (
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
      ) : (
        <div className="flex flex-col">
          {users.map((user, index) => {
            if (index === users.length - 1) {
              return (
                <EmployeeListItem ref={lastUserRef} key={user.id} user={user} />
              );
            } else {
              return <EmployeeListItem key={user.id} user={user} />;
            }
          })}
          {loading && <div>Loading more users...</div>}
          {!hasMore && <div>No more users to load.</div>}
        </div>
      )}
    </div>
  );
};

export default EmployeesPageView;
