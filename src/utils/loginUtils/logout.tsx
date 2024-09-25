import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/configureStore";
import { logout } from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());

    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;
