import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Later you will clear tokens / session here
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6">

      {/* Logout Icon */}
      <span className="material-icons text-red-500 text-6xl mb-6">
        logout
      </span>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-3">Logout</h1>
      <p className="text-gray-400 mb-8 text-center">
        Are you sure you want to log out from your account?
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 font-semibold"
        >
          Yes, Logout
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
