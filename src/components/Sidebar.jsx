import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; 

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 font-bold text-lg">Madrocket Tech</div>
      <ul className="flex flex-col gap-2 p-4">
        <li
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/students")}
        >
          Students Page
        </li>
        <li
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
