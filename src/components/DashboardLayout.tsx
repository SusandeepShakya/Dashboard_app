import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../store/slices/authSlice";
import Sidebar, { Tab } from "./Sidebar";

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarTabs: Tab[] = useMemo(() => [
    { id: 'home', label: 'Home', icon: '🏠', path: '/' },
    { id: 'data', label: 'Data', icon: '📊', path: '/data' },
  ], []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        tabs={sidebarTabs}
        title="Dashboard"
        onLogout={handleLogout}
        user={user || undefined}
      />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto relative">
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none shadow-lg"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="mt-12 lg:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

