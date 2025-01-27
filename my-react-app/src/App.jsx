import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import React, { StrictMode } from "react";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Footer from "./pages/Footer";
import "./app.css";
import axios from 'axios';
import { check } from './api/test.js';

export default function App() {
  const isAuthenticated = async () => {
    // Replace with actual authentication logic (e.g., token or session validation)
    try {
      const token = await check()

      return true;
    } catch (error) {
      console.error("Authentication error:", error);
      return false;
    }
  };

  // PrivateRoute for authenticated access
  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute element={<LayoutWrapper />} />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper for Layout and Footer
function LayoutWrapper() {
  return (
    <>
      <Layout />
      <Outlet />
      <Footer />
    </>
  );
}

// Render App
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
