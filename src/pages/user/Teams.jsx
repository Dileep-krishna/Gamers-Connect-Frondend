import React from "react";
import Navbar from "../../assets/components/common/Navbar";


const Teams = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
   
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">👥 Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example team cards */}
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700">
            <h3 className="text-xl font-semibold mb-2">Team Alpha</h3>
            <p className="text-gray-400">Members: 5</p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Join
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700">
            <h3 className="text-xl font-semibold mb-2">Team Beta</h3>
            <p className="text-gray-400">Members: 3</p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;   // ✅ Critical line
