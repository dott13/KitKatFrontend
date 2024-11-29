import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPageView from "./components/FullLogin/LoginPage/LoginPageView";
import DashboardPageView from "./components/Manager/Dashboard/DashboardPageView.tsx";
import EmployeesPageView from "./components/Manager/Employees/EmployeesPageView.tsx";
import Layout from "./Layout.tsx";
import Logout from "./utils/loginUtils/logout.tsx";
import AccountPageView from "./components/Worker/Account/AccountPageView.tsx";
import ProjectDetails from "./components/Worker/Project/ProjectDetails.tsx";
import ProtectedRoute from "./components/layout/ProtectedRouteProps.tsx";
import {getRoleFromToken} from "./utils/tokenUtils/getRoleFromToken.tsx";
import UnauthorizedPage from "./components/UnauthorizedPage.tsx";

interface UserRoles {
  role: "ROLE_MANAGER"| "ROLE_USER" | "ROLE_ADMIN"
}

const validRoles: UserRoles["role"][] = ["ROLE_MANAGER", "ROLE_USER", "ROLE_ADMIN"];


function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");
  const userRole = (validRoles.includes(getRoleFromToken(token!) as UserRoles["role"])
    ? getRoleFromToken(token!)
    : null) as UserRoles["role"] | null;  console.log(userRole);


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

          <Route element={<Layout role={userRole}/>}>

            <Route path="/dashboard" element={<DashboardPageView />}/>
            <Route path="/employees"
              element={
                <ProtectedRoute allowedRoles={["ROLE_MANAGER"]} userRole={userRole}>
                  <EmployeesPageView />
                </ProtectedRoute>
              }
            />
            <Route path="/account"
              element={
                <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_MANAGER"]} userRole={userRole}>
                  <AccountPageView />
                </ProtectedRoute>
              }
            />
            <Route path="/project" element={<ProjectDetails />}/>

            <Route path="/unauthorized" element={<UnauthorizedPage/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
