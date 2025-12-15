import React from "react";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const navigate = useNavigate();

  const savedPosts = [
    {
      id: 1,
      username: "Arjun Gamer",
      game: "PUBG Mobile",
      time: "2h ago",
      content: "Crazy clutch moment in the final circle! Managed to 1v3 with just a pistol. The adrenaline rush was insane! 🔥",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      likes: 245,
      comments: 36,
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      userLevel: 28
    },
    {
      id: 2,
      username: "Riya",
      game: "Free Fire",
      time: "1 day ago",
      content: "Sniper headshots compilation from last night's ranked match. Perfect 360 no-scope in the final moment! 🎯",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      likes: 189,
      comments: 24,
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      userLevel: 32
    },
    {
      id: 3,
      username: "ProPlayer99",
      game: "Valorant",
      time: "3 days ago",
      content: "Perfect ace in competitive! Team couldn't believe the 1v5 clutch. What's your best Valorant moment? 💥",
      image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      likes: 512,
      comments: 67,
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      userLevel: 45
    }
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-transparent bg-clip-text">
            Saved Posts
          </h1>
          <p className="text-gray-300 mt-1">Your collection of amazing gaming moments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
          <div className="text-2xl font-bold text-white">{savedPosts.length}</div>
          <div className="text-gray-400 text-sm">Saved Posts</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {savedPosts.reduce((total, post) => total + post.likes, 0)}
          </div>
          <div className="text-gray-400 text-sm">Total Likes</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
          <div className="text-2xl font-bold text-green-400">
            {savedPosts.reduce((total, post) => total + post.comments, 0)}
          </div>
          <div className="text-gray-400 text-sm">Total Comments</div>
        </div>
      </div>

      {/* No Saved Posts */}
      {savedPosts.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-300 mb-2">No saved posts yet</h2>
          <p className="text-gray-400 mb-6">Start saving your favorite gaming moments!</p>
          <button 
            onClick={() => navigate('/explore')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl font-medium transition-all duration-300"
          >
            Explore Posts
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {savedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* User Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={post.userAvatar}
                      alt={post.username}
                      className="w-12 h-12 rounded-2xl border-2 border-purple-500"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                      {post.userLevel}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {post.username}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      In <span className="text-purple-400 font-medium">{post.game}</span> • {post.time}
                    </p>
                  </div>
                </div>

                {/* Saved Icon */}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl animate-pulse">⭐</span>
                  <span className="text-gray-400 text-sm">Saved</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-200 mb-4 leading-relaxed">{post.content}</p>

              {/* Image */}
              <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={post.image}
                  alt="Game moment"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-red-400">❤️</span>
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-400">💬</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white text-sm transition-colors">
                  Remove from saved
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                  View Full Post
                </button>
                <button className="px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors duration-300">
                  <span className="text-lg">↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {savedPosts.length > 0 && (
        <div className="fixed bottom-6 right-6 flex gap-3">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110">
            <span className="text-xl">📚</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Saved;