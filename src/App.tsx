import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPageView from "./components/FullLogin/LoginPage/LoginPageView";

function App() {
  return (
    <div className="bg-main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPageView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
