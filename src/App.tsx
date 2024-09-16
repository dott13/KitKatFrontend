import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPageView from "./components/FullLogin/LoginPage/LoginPageView";
import DashboardPageView from "./components/dashboard/DashboardPageView.tsx";

function App() {
  return (
    <div className="bg-main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              localStorage.getItem("isLoggedIn") === "true"?
                (<Navigate to="/dashboard" />):
                  (<Navigate to="/login" />)

          } />
          <Route path="/login" element={<LoginPageView />} />
          <Route path="/dashboard" element={<DashboardPageView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
