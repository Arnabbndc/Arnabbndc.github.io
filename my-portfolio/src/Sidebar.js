import React from 'react';
import { 
  User, 
  Settings, 
  History, 
  Library, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ setIsOpen, isOpen }) => {
  const { logout } = useAuth();

  const menuItems = [
    { title: 'Your Profile', icon: <User size={20} />, path: '/profile' },
    { title: 'Profile Settings', icon: <Settings size={20} />, path: '/settings' },
    { title: 'History', icon: <History size={20} />, path: '/history' },
    { title: 'My Products', icon: <Library size={20} />, path: '/products' },
  ];

  return (
    <div className=" min-h-screen ">
      {/* Mobile menu button */}
      <button
        className="sticky lg:hidden sm:-translate-x-5 top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`relative lg:translate-y-0 sm:-translate-y-10  h-full lg:w-64 sm:w-40 bg-gray-800 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl sm:text-lg sm:text-right font-bold lg:text-center">Dashboard</h2>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 bg-gray-800 flex flex-col justify-between h-full">
          <div className="px-4 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="w-full  flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </a>
            ))}
            <div className="px-4 py-3">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
          </div>
          
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;