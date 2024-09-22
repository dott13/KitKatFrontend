import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPageView from "./components/FullLogin/LoginPage/LoginPageView";
import DashboardPageView from "./components/Manager/dashboard/DashboardPageView.tsx";
import EmployeesPageView from "./components/Manager/Employees/EmployeesPageView.tsx";

function App() {
  return (
    <div className="bg-main">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("isLoggedIn") === "true" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginPageView />} />
          <Route path="/dashboard" element={<DashboardPageView />} />
          <Route path="/employees" element={<EmployeesPageView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
