import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import logo from '../logo.svg' // Ensure you have the logo.png in the correct path
import { useState } from "react";


const FarmerDashboard = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  if (!auth.isLoggedIn || !auth.user) {
    return <p className="p-4">Please log in to access your dashboard.</p>;
  }

  return (
    <div className=" h-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="flex flex-1">
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
        <main className={`flex-1  h-full p-6 transition-all duration-300 `}>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Farmer Dashboard</h1>
            <div className="flex flex-col items-center">
              <img src={logo} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
              <div className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white  py-10 rounded-lg shadow-md w-full text-center">
                <h2 className="text-xl font-semibold mb-4 text-center">User Information</h2>
                <p className="mt-2"><strong>Username:</strong> {auth.user.username}</p>
                <p className="mt-2"><strong>Email:</strong> {auth.user.email}</p>
                <p className="mt-2"><strong>Created At:</strong> {new Date(auth.user.created_at).toLocaleDateString()}</p>
                <p className="mt-2"><strong>User Type:</strong> {auth.user.user_type}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;