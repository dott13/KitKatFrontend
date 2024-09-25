import React, { useState, useRef, useCallback, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeListItem from "./EmployeeListItem";
import { FaFilter, FaListUl } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/configureStore";
import { getAllUser } from "../../../redux/userSlice/userSlice";
import { Spin } from "antd";

const EmployeesPageView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const { list: users, status } = useSelector((state: RootState) => state.user);
  const [visibleUsers, setVisibleUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [view, setView] = useState<"card" | "list">("card");
  const [openUserId, setOpenUserId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const usersPerPage = 9;

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && Array.isArray(users)) {
      setVisibleUsers(users.slice(0, usersPerPage)); // Set initial visible users
      setHasMore(users.length > usersPerPage); // Check if there are more users to load
    }
  }, [status, users]);

  const loadMoreUsers = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);

    const nextPageUsers = users
      ? users.slice((page - 1) * usersPerPage, page * usersPerPage)
      : [];

    if (nextPageUsers.length > 0) {
      setVisibleUsers((prevUsers) => [...prevUsers, ...nextPageUsers]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false); // No more users to load
    }

    setLoading(false);
  }, [page, users, loading, hasMore]);

  const lastUserRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreUsers();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreUsers]
  );

  const handleToggleStatus = (id: number) => {
    setOpenUserId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="px-[5%] py-[2%]">
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

      {status === "loading" ? (
        <div>
          <Spin />
        </div>
      ) : (
        <>
          {view === "card" ? (
            <div className="flex flex-wrap justify-between gap-4 box-border">
              {visibleUsers.map((user, index) => {
                if (index === visibleUsers.length - 1) {
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
            </div>
          ) : (
            <div className="flex flex-col">
              {visibleUsers.map((user, index) => {
                if (index === visibleUsers.length - 1) {
                  return (
                    <EmployeeListItem
                      ref={lastUserRef}
                      key={user.id}
                      user={user}
                    />
                  );
                } else {
                  return <EmployeeListItem key={user.id} user={user} />;
                }
              })}
              {loading && <div>Loading more users...</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeesPageView;
