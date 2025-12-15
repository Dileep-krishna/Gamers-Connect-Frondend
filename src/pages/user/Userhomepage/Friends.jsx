import React from "react";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const navigate = useNavigate();

  const onlineFriends = [
    {
      id: 1,
      name: "AceHunter",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
      game: "Playing Valorant",
      level: 25
    },
    {
      id: 2,
      name: "NovaStar",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
      game: "In Apex Legends",
      level: 18
    },
    {
      id: 3,
      name: "ShadowWolf",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      game: "Streaming",
      level: 32
    },
    {
      id: 4,
      name: "PhoenixRise",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      game: "In Lobby",
      level: 15
    },
  ];

  const allFriends = [
    {
      id: 1,
      name: "RogueKnight",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      status: "Offline",
      lastSeen: "2 hours ago",
      level: 28
    },
    {
      id: 2,
      name: "LunaGamer",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
      status: "Online",
      game: "Playing COD",
      level: 22
    },
    {
      id: 3,
      name: "ViperKing",
      avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=200&q=80",
      status: "Offline",
      lastSeen: "1 day ago",
      level: 35
    },
  ];

  const friendRequests = [
    {
      id: 1,
      name: "GhostRider",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&q=80",
      mutual: "5 mutual friends",
      level: 19
    },
    {
      id: 2,
      name: "CrimsonValkyrie",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      mutual: "3 mutual friends",
      level: 24
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white p-6">
      
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/20"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back</span>
        </button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
            Friends
          </h1>
          <p className="text-gray-300 mt-1">Connect and play with your gaming squad</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-white">{allFriends.length + onlineFriends.length}</div>
          <div className="text-gray-400 text-sm">Total Friends</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-green-400">{onlineFriends.length}</div>
          <div className="text-gray-400 text-sm">Online Now</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-yellow-400">{friendRequests.length}</div>
          <div className="text-gray-400 text-sm">Requests</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-blue-400">12</div>
          <div className="text-gray-400 text-sm">Groups</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search friends, gamers, or tags..."
            className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-12"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <span className="text-gray-400 text-xl">🔍</span>
          </div>
        </div>
      </div>

      {/* Online Friends */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            Online Friends
          </h2>
          <span className="text-gray-400 text-sm">{onlineFriends.length} online</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {onlineFriends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={friend.avatar}
                  className="w-20 h-20 rounded-2xl mx-auto border-2 border-green-400 group-hover:border-green-300 transition-colors"
                  alt={friend.name}
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Lvl {friend.level}
                </div>
              </div>
              <div className="text-center mt-3">
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {friend.name}
                </h3>
                <p className="text-green-400 text-sm mt-1">{friend.game}</p>
                <button className="mt-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-xs font-medium transition-colors">
                  Join Game
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Friend Requests */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-yellow-400 text-xl">📩</span>
            Friend Requests
          </h2>
          <span className="text-gray-400 text-sm">{friendRequests.length} pending</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friendRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={req.avatar}
                    className="w-16 h-16 rounded-2xl border border-white/20"
                    alt={req.name}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                    Lvl {req.level}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{req.name}</h3>
                  <p className="text-gray-400 text-sm">{req.mutual}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-medium transition-colors flex-1">
                      Accept
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-medium transition-colors flex-1">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Friends */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-blue-400 text-xl">👥</span>
            All Friends
          </h2>
          <span className="text-gray-400 text-sm">{allFriends.length} total</span>
        </div>
        <div className="space-y-3">
          {allFriends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={friend.avatar}
                    className="w-14 h-14 rounded-2xl border border-white/20 group-hover:border-purple-400 transition-colors"
                    alt={friend.name}
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
                    friend.status === "Online" ? "bg-green-400" : "bg-gray-500"
                  }`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{friend.name}</h3>
                    <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                      Lvl {friend.level}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    friend.status === "Online" 
                      ? "text-green-400" 
                      : "text-gray-400"
                  }`}>
                    {friend.status === "Online" ? friend.game : friend.lastSeen}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium transition-colors">
                    Message
                  </button>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl text-sm font-medium transition-colors">
                    Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Friend Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110">
          <span className="text-xl">+</span>
          <span className="sr-only">Add Friend</span>
        </button>
      </div>
    </div>
  );
};

export default Friends;