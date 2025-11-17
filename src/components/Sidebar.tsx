import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface Tab {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: Tab[];
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  tabs,
  title = "Dashboard",
}) => {
  const location = useLocation();

  const handleTabClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50 w-56 max-w-[85%] lg:w-64 bg-gray-800 text-white h-screen lg:h-screen transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-gray-300 focus:outline-none"
            aria-label="Close sidebar"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-8 flex flex-col h-[calc(100vh-120px)]">
          <div className="flex-1">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  onClick={handleTabClick}
                  className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition-colors ${isActive
                    ? 'bg-gray-700 border-r-4 border-blue-500'
                    : 'hover:bg-gray-700'
                    }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;