import React, { useState } from "react";
import LoginForm from "./components/auth/LoginForm";
import EmployeePage from "./components/employees/EmployeePage";
import HamburgerMenu from "./components/layout/HamburgerMenu";
import HorizontalMenu from "./components/layout/HorizontalMenu";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    setRole("");
  };

  if (!token) {
    return (
      <div className="app-root auth-page">
        <LoginForm
          onLogin={(tok, r) => {
            localStorage.setItem("token", tok);
            localStorage.setItem("role", r);
            setToken(tok);
            setRole(r);
          }}
        />
      </div>
    );
  }

  return (
    <div className="app-root">
      <header className="top-bar">
        <HamburgerMenu />
        <div className="logo">Employee Portal</div>
        <HorizontalMenu />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="main-content">
        <EmployeePage role={role} />
      </main>
    </div>
  );
};

export default App;
