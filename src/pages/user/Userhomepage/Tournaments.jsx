import React from "react";
import { useNavigate } from "react-router-dom";

const Tournaments = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-gray-300 hover:text-white"
      >
        <span className="material-icons">⬅</span>
        Back
      </button>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Tournaments</h1>

      {/* Featured Tournament Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">🔥 Battle Royale Championship</h2>
        <p className="text-gray-200 mb-3">
          Join the ultimate gaming competition and win exciting rewards!
        </p>
        <button className="bg-black/40 hover:bg-black/60 px-4 py-2 rounded-lg text-sm font-medium">
          View Details
        </button>
      </div>

      {/* Tournament Cards */}
      <h2 className="text-xl font-semibold mb-4">Popular Tournaments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
          <h3 className="text-lg font-bold mb-1">Free Fire Clash Cup</h3>
          <p className="text-gray-400 text-sm mb-2">Prize Pool: ₹50,000</p>
          <button className="mt-2 bg-indigo-600 px-3 py-1 rounded-lg">Join</button>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
          <h3 className="text-lg font-bold mb-1">Valorant Pro League</h3>
          <p className="text-gray-400 text-sm mb-2">Prize Pool: ₹1,20,000</p>
          <button className="mt-2 bg-indigo-600 px-3 py-1 rounded-lg">Join</button>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
          <h3 className="text-lg font-bold mb-1">BGMI Squad Showdown</h3>
          <p className="text-gray-400 text-sm mb-2">Prize Pool: ₹75,000</p>
          <button className="mt-2 bg-indigo-600 px-3 py-1 rounded-lg">Join</button>
        </div>
      </div>

      {/* Upcoming */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Upcoming Tournaments</h2>

      <div className="space-y-4">
        {[
          "Call of Duty Mobile – Sniper Arena",
          "Fortnite Duo Cup",
          "EA FC Mobile Champions League",
          "PUBG New State Arena Clash",
        ].map((item, i) => (
          <div
            key={i}
            className="bg-gray-800 p-4 rounded-xl flex justify-between items-center hover:bg-gray-700 transition"
          >
            <span className="font-medium">{item}</span>
            <button className="bg-indigo-600 px-3 py-1 rounded-lg text-sm">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
