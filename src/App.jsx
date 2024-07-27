import React, { useEffect, useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import BudgetPage from "./pages/BudgetPage";

function App() {
  return (
    <div className="flex w-full" style={{ backgroundColor: "#f4fafc" }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </div>
  );
}

export default App;
