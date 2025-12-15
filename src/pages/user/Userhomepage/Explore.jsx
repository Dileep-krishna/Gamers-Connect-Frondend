import React from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate(); // ✅ Correct Hook

  const trendingGames = [
    {
      id: 1,
      name: "Valorant",
      image:
        "https://images.unsplash.com/photo-1606111527624-e3e84f94c9c9?auto=format&fit=crop&w=800&q=80",
      players: "12.4k players online",
    },
    {
      id: 2,
      name: "Apex Legends",
      image:
        "https://images.unsplash.com/photo-1605902711622-cfb43c44367e?auto=format&fit=crop&w=800&q=80",
      players: "8.9k players online",
    },
    {
      id: 3,
      name: "Fortnite",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      players: "15.2k players online",
    },
    {
      id: 4,
      name: "Cyberpunk 2077",
      image:
        "https://images.unsplash.com/photo-1612093970569-1feef846b8d0?auto=format&fit=crop&w=800&q=80",
      players: "6.3k players online",
    },
  ];

  const recommendedUsers = [
    {
      id: 1,
      name: "ShadowSlayer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      game: "Valorant",
    },
    {
      id: 2,
      name: "LunaRay",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      game: "Apex Legends",
    },
    {
      id: 3,
      name: "KnightX",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      game: "Cyberpunk 2077",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}   // ✅ FIXED
        className="flex items-center gap-2 mb-4 text-gray-300 hover:text-white"
      >
        <span className="material-icons">⬅</span>
        Back
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Explore
        </h1>
        <p className="text-gray-400">Discover games, players, and trending content</p>
      </div>

      {/* Search Bar */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search for games, players or content..."
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Trending Games */}
      <h2 className="text-2xl font-semibold mb-4">🔥 Trending Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {trendingGames.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-all border border-gray-700 cursor-pointer"
          >
            <img src={game.image} alt={game.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{game.name}</h3>
              <p className="text-gray-400 text-sm">{game.players}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Players */}
      <h2 className="text-2xl font-semibold mb-4">🎮 Players You May Like</h2>
      <div className="flex flex-col gap-4">
        {recommendedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/60 transition cursor-pointer"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full border border-gray-600"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-gray-400 text-sm">Plays {user.game}</p>
            </div>
            <button className="px-4 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
