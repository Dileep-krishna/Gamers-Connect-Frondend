import React, { useState } from "react";
import { Link } from "react-router-dom";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 1,
      title: "Game Clip Sharing",
      description: "Record, edit, and share your best gaming moments with the community",
      icon: "🎮",
      details: [
        "1080p HD recording with 60 FPS",
        "One-click editing tools",
        "Instant sharing to social media",
        "Cloud storage for all your clips"
      ],
      color: "from-green-500 to-blue-500"
    },
    {
      id: 2,
      title: "Real-time Chat",
      description: "Connect with gamers worldwide through text, voice, and video chat",
      icon: "💬",
      details: [
        "Crystal clear voice chat",
        "Low-latency messaging",
        "Private and group chats",
        "Custom emojis and stickers"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Leaderboards",
      description: "Compete with friends and climb the global rankings",
      icon: "🏆",
      details: [
        "Real-time ranking updates",
        "Multiple game categories",
        "Seasonal competitions",
        "Achievement badges"
      ],
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 4,
      title: "Team Finder",
      description: "Find the perfect teammates for your next gaming session",
      icon: "👥",
      details: [
        "Skill-based matching",
        "Role preference system",
        "Schedule coordination",
        "Team performance tracking"
      ],
      color: "from-blue-500 to-teal-500"
    },
    {
      id: 5,
      title: "Tournaments",
      description: "Join competitive tournaments with real prizes",
      icon: "⚔️",
      details: [
        "Daily and weekly events",
        "Cash prize pools",
        "Professional brackets",
        "Live streaming integration"
      ],
      color: "from-red-500 to-purple-500"
    },
    {
      id: 6,
      title: "Game Stats",
      description: "Track your performance with detailed analytics",
      icon: "📊",
      details: [
        "Comprehensive performance metrics",
        "Progress over time charts",
        "Comparison tools",
        "Personalized insights"
      ],
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Gamers" },
    { number: "1M+", label: "Clips Shared" },
    { number: "500+", label: "Tournaments" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="min-h-screen bg-black/70 backdrop-blur-sm">
        <Link 
          to="/home"
          className="fixed top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl border border-white/10 hover:bg-gray-700/80 transition-all duration-300 hover:scale-105"
        >
          <span>⬅️</span>
          Back
        </Link>
        
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Features
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Explore all the exciting features Gamers Connect offers — clips, chat, leaderboards, and more!
                Everything you need to connect, compete, and share your gaming journey.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-400">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 border-2 ${
                  activeFeature === index ? 'border-green-500' : 'border-gray-700'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Spotlight */}
        <div className="bg-gray-800/50 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Feature <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Spotlight</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover how our most popular features are transforming the gaming experience
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">{features[activeFeature].title}</h3>
                <p className="text-gray-300 text-lg">{features[activeFeature].description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {features[activeFeature].details.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${features[activeFeature].color} flex items-center justify-center`}>
                        <span className="text-sm">✓</span>
                      </div>
                      <span className="text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
                <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200">
                  Try It Now
                </button>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-700/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-6xl mb-4 ${activeFeature === 0 ? 'animate-bounce' : ''}`}>
                      {features[activeFeature].icon}
                    </div>
                    <div className="text-gray-400">Interactive Demo</div>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl opacity-20 blur"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Level Up Your Gaming Experience?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of gamers who are already connecting, competing, and sharing their best moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
              Get Started Free
            </button>
            <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-green-500 hover:text-green-400 transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Platform Support */}
        <div className="bg-gray-800/30 backdrop-blur-sm py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-gray-400 mb-8">Supported Platforms</h3>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              {['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile', 'VR'].map((platform) => (
                <div key={platform} className="text-2xl font-bold text-gray-400 hover:text-white transition-colors">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;