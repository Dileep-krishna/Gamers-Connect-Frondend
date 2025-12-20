import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Community = () => {
  const [showJoinMessage, setShowJoinMessage] = useState(false);

  const handleJoinCommunity = () => {
    setShowJoinMessage(true);
    setTimeout(() => {
      setShowJoinMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Back Button */}
      <Link 
        to="/home"
        className="fixed top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl border border-white/10 hover:bg-gray-700/80 transition-all duration-300 hover:scale-105"
      >
        <span>⬅️</span>
        Back
      </Link>

      {/* Gaming Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-30"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      />
      
      {/* Popup Message */}
      {showJoinMessage && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl border border-green-400/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">👥</span>
              <div>
                <p className="font-bold">Please Sign Up First!</p>
                <p className="text-sm opacity-90">Create an account to join our gaming community</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Gaming Community
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with fellow gamers, share strategies, and build your gaming squad
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Community Features */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Community Features</h2>
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="text-green-400">💬</span>
                      Discussion forums
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-green-400">🎯</span>
                      Strategy guides
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-green-400">👑</span>
                      Leaderboards
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-green-400">🎮</span>
                      LFG (Looking for Group)
                    </li>
                  </ul>
                </div>

                {/* Active Communities */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Active Communities</h2>
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="text-blue-400">⚔️</span>
                      Competitive Esports
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-blue-400">🏆</span>
                      Tournament Players
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-blue-400">🎨</span>
                      Content Creators
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-blue-400">🔊</span>
                      Voice Chat Groups
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-400">25K+</div>
                  <div className="text-gray-300 text-sm">Active Members</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-400">500+</div>
                  <div className="text-gray-300 text-sm">Daily Posts</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-purple-400">150+</div>
                  <div className="text-gray-300 text-sm">Gaming Groups</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-400">50+</div>
                  <div className="text-gray-300 text-sm">Games Supported</div>
                </div>
              </div>

              {/* Popular Discussions */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Popular Discussions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/50 rounded-xl p-4 text-center hover:bg-gray-600/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="font-semibold text-white">Best Valorant Strategies</p>
                    <p className="text-gray-400 text-sm">1.2k comments</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4 text-center hover:bg-gray-600/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🏆</div>
                    <p className="font-semibold text-white">Tournament Updates</p>
                    <p className="text-gray-400 text-sm">856 comments</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4 text-center hover:bg-gray-600/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🔧</div>
                    <p className="font-semibold text-white">Tech & Setup Tips</p>
                    <p className="text-gray-400 text-sm">642 comments</p>
                  </div>
                </div>
              </div>

              {/* Join Community CTA */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Join Our Gaming Community</h3>
                <p className="text-gray-300 mb-6">
                  Connect with players, share your expertise, and find your perfect gaming partners.
                </p>
                <button 
                  onClick={handleJoinCommunity}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                >
                  Join Community Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;