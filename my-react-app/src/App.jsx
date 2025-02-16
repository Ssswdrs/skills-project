import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import React, { StrictMode } from "react";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Footer from "./pages/Footer";
import "./App.css";
import { check } from './api/check.js';
import Register from "./pages/Register.jsx";
import { ToastContainer, Zoom } from 'react-toastify';
export default function App() {
  
  const isAuthenticated = async () => {
    // Replace with actual authentication logic (e.g., token or session validation)
    try {
      await check()

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
      <Routes>
        {/* Public route */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

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
if (import.meta.env.VITE_MODE === 'production') {
  console.log = function () {}; // Disable console.log in production
}
