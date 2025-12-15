import React from "react";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const navigate = useNavigate();

  // Sample groups (UI only)
  const groups = [
    {
      id: 1,
      name: "Valorant India Community",
      members: "12,540 members",
      image:
        "https://images.unsplash.com/photo-1605652654162-254a56c9fa64?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "BGMI Squad Zone",
      members: "7,320 members",
      image:
        "https://images.unsplash.com/photo-1598550487031-49e60a2598c6?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Apex Legends Warriors",
      members: "5,810 members",
      image:
        "https://images.unsplash.com/photo-1611605698335-dc1c83f77bea?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-gray-300 hover:text-white"
      >
        <span className="material-icons">Back</span>
      
      </button>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
        Groups
      </h1>
      <p className="text-gray-400 mb-6">Join gaming communities and find your squad</p>

      {/* Create Group Button */}
      <div className="mb-6">
        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-white font-medium">
          + Create New Group
        </button>
      </div>

      {/* Groups List */}
      <div className="space-y-5">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 border border-gray-700 hover:bg-gray-700/60 transition cursor-pointer"
          >
            <img
              src={group.image}
              alt={group.name}
              className="w-20 h-20 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h2 className="text-xl font-bold">{group.name}</h2>
              <p className="text-gray-400 text-sm">{group.members}</p>
            </div>

            <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
              Join
            </button>
          </div>
        ))}
      </div>

      {/* Suggested Groups Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">🔥 Suggested Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {groups.slice(0, 2).map((group) => (
          <div
            key={group.id}
            className="bg-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition border border-gray-700 cursor-pointer"
          >
            <img src={group.image} alt={group.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{group.name}</h3>
              <p className="text-gray-400 text-sm">{group.members}</p>
              <button className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg text-sm">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
