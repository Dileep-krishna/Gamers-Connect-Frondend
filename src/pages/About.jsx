import React, { useState } from "react";
import { Link } from "react-router-dom";


const About = () => {
  const [showSignupMessage, setShowSignupMessage] = useState(false);

  const handleGetStarted = () => {
    setShowSignupMessage(true);
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowSignupMessage(false);
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
      {showSignupMessage && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-xl shadow-2xl border border-purple-400/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎮</span>
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
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Gamers Connect
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Where gamers unite, compete, and create unforgettable moments together
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Our Mission */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                  <p className="text-gray-300 leading-relaxed">
                    To create the ultimate gaming community platform where players can connect, 
                    share their epic moments, and build lasting friendships through their passion for gaming.
                  </p>
                </div>

                {/* What We Offer */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">What We Offer</h2>
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="text-purple-400">🎮</span>
                      Social gaming platform
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-purple-400">🏆</span>
                      Tournament hosting
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-purple-400">👥</span>
                      Community groups
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-purple-400">📱</span>
                      Content sharing
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-purple-400">50K+</div>
                  <div className="text-gray-300 text-sm">Active Gamers</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-400">1K+</div>
                  <div className="text-gray-300 text-sm">Tournaments</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-400">500+</div>
                  <div className="text-gray-300 text-sm">Gaming Groups</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-400">24/7</div>
                  <div className="text-gray-300 text-sm">Active Community</div>
                </div>
              </div>

              {/* Join Community CTA */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Join Our Growing Community</h3>
                <p className="text-gray-300 mb-6">
                  Connect with fellow gamers, share your achievements, and be part of something amazing.
                </p>
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;