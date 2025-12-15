import React from "react";
import Navbar from "../../assets/components/common/Navbar";


const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
     
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">🏆 Leaderboard</h2>
        <table className="w-full bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Rank</th>
              <th className="p-3">Player</th>
              <th className="p-3">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-700">
              <td className="p-3">1</td>
              <td className="p-3">Dileep</td>
              <td className="p-3">1500</td>
            </tr>
            <tr className="border-t border-gray-700">
              <td className="p-3">2</td>
              <td className="p-3">PlayerX</td>
              <td className="p-3">1200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;   // ✅ Critical line
