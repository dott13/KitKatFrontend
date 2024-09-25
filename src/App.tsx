import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPageView from "./components/FullLogin/LoginPage/LoginPageView";
import DashboardPageView from "./components/Manager/Dashboard/DashboardPageView.tsx";
import EmployeesPageView from "./components/Manager/Employees/EmployeesPageView.tsx";
import Layout from "./Layout.tsx";
import Logout from "./utils/loginUtils/logout.tsx";
import AccountPageView from "./components/Worker/Account/AccountPageView.tsx";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="bg-main">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPageView />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPageView />} />
            <Route path="/employees" element={<EmployeesPageView />} />
            <Route path="/account" element={<AccountPageView/>}/>
            <Route path="/project" />
            <Route path="/settings" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
