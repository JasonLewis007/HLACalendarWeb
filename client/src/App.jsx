import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import CalendarMenu from "./pages/CalendarMenu/CalendarMenu";



function CalendarShell() {
  return (
    <div style={{ padding: 24, fontFamily: "Arial, Helvetica, sans-serif" }}>
      <h2>Calendar Shell (placeholder)</h2>
      <p>Next up: territory + plant dropdowns + FullCalendar area.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={<CalendarMenu />} />

      </Routes>
    </BrowserRouter>
  );
}

