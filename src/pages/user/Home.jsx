import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "shooter", "rpg", "strategy", "sports", "racing", "adventure"];

  const gamingClips = [
    { id: 1, title: "Epic Victory Royale!", game: "Fortnite", player: "ProGamer99", views: "2.4K", duration: "0:45", thumbnail: "🎮", likes: 245 },
    { id: 2, title: "Impossible Headshot", game: "Call of Duty", player: "SniperElite", views: "5.7K", duration: "1:20", thumbnail: "🔫", likes: 892 },
    { id: 3, title: "Final Boss Defeated", game: "Elden Ring", player: "SoulsMaster", views: "8.1K", duration: "2:15", thumbnail: "⚔️", likes: 1567 },
    { id: 4, title: "Perfect Combo", game: "Street Fighter", player: "ComboKing", views: "3.2K", duration: "0:30", thumbnail: "👊", likes: 543 },
    { id: 5, title: "Clutch 1v5", game: "Valorant", player: "AceMaster", views: "4.8K", duration: "1:45", thumbnail: "🎯", likes: 1123 },
    { id: 6, title: "Perfect Drift", game: "Forza Horizon", player: "SpeedDemon", views: "2.1K", duration: "0:55", thumbnail: "🏎️", likes: 456 },
  ];

  // Instagram-style trending feeds with images
  const trendingFeeds = [
    { 
      id: 1, 
      title: "New Game Release: Cyber Odyssey", 
      content: "The most anticipated RPG of the year is finally here! Explore futuristic cities and battle rogue AI.", 
      author: "GameNews", 
      authorAvatar: "👾",
      time: "2 hours ago", 
      likes: 1245, 
      comments: 89,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=400&fit=crop",
      type: "image"
    },
    { 
      id: 2, 
      title: "Esports Tournament Finals", 
      content: "Watch the top teams battle for $1M prize pool this weekend! Don't miss the action.", 
      author: "EsportsWorld", 
      authorAvatar: "🏆",
      time: "5 hours ago", 
      likes: 892, 
      comments: 156,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=400&fit=crop",
      type: "image"
    },
    { 
      id: 3, 
      title: "Pro Player Switches Teams", 
      content: "Legendary player transfers to new organization in shocking move that changes the competitive landscape.", 
      author: "GamingInsider", 
      authorAvatar: "📰",
      time: "1 day ago", 
      likes: 567, 
      comments: 78,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=400&fit=crop",
      type: "image"
    },
    { 
      id: 4, 
      title: "New Skin Collection", 
      content: "Check out the amazing new character skins available in the latest update!", 
      author: "FashionGamer", 
      authorAvatar: "👗",
      time: "3 hours ago", 
      likes: 234, 
      comments: 45,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=400&fit=crop",
      type: "image"
    }
  ];

  const topPlayers = [
    { rank: 1, name: "NinjaSlayer", game: "Valorant", level: 99, wins: 1247, online: true, avatar: "🥷" },
    { rank: 2, name: "QueenGamer", game: "League of Legends", level: 87, wins: 892, online: true, avatar: "👑" },
    { rank: 3, name: "ProStreamer", game: "Fortnite", level: 95, wins: 1567, online: false, avatar: "🎥" },
    { rank: 4, name: "DarkKnight", game: "Apex Legends", level: 91, wins: 1034, online: true, avatar: "🦇" },
    { rank: 5, name: "PixelWarrior", game: "Minecraft", level: 88, wins: 789, online: true, avatar: "⚔️" },
  ];

  const liveStreams = [
    { id: 1, streamer: "ProGamer99", game: "Fortnite", viewers: "2.4K", title: "Ranked Grind to Champion", avatar: "🎮" },
    { id: 2, streamer: "SniperElite", game: "Call of Duty", viewers: "1.8K", title: "Tournament Practice", avatar: "🔫" },
    { id: 3, streamer: "ComboKing", game: "Street Fighter", viewers: "3.2K", title: "Combo Tutorial Live", avatar: "👊" },
    { id: 4, streamer: "SpeedDemon", game: "Forza Horizon", viewers: "1.1K", title: "Racing Championship", avatar: "🏎️" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Summer Gaming Festival", date: "June 15-18", participants: "10K+", prize: "$500K" },
    { id: 2, title: "World Esports Championship", date: "July 22-24", participants: "5K+", prize: "$1M" },
    { id: 3, title: "Community Tournament", date: "May 30", participants: "1K+", prize: "$50K" },
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* Gaming Background Image - CHANGED */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      {/* Dark Overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/95 via-purple-900/50 to-black/95 z-0"></div>

      {/* ---------------------- FIXED NAVBAR ---------------------- */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-xl border-b border-purple-500/30 z-50 shadow-2xl">
        <div className="w-full px-6 py-4 flex items-center">
          {/* LEFT — LOGO */}
          <div className="flex flex-1 justify-start">
            <Link to="/home" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🎮
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Gamers Connect
              </h1>
            </Link>
          </div>

          {/* CENTER — NAVIGATION LINKS */}
          <div className="flex flex-1 justify-center gap-6">
            {[
              { to: "/home", label: "Home", emoji: "🏠" },
              { to: "/about", label: "About", emoji: "ℹ️" },
              { to: "/community", label: "Community", emoji: "🌐" },
              { to: "/contact", label: "Contact", emoji: "📞" },
              { to: "/features", label: "Features", emoji: "✨" }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* RIGHT — AUTH BUTTONS */}
          <div className="flex flex-1 justify-end gap-3">
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 font-semibold border border-gray-600 hover:border-purple-500"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - Added padding top to account for fixed navbar */}
      <div className="relative z-10 pt-24">

        {/* ---------------- ENHANCED HERO SECTION ---------------- */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Level Up Your<br />Gaming Experience
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect with millions of gamers worldwide. Share your epic moments With Us........
            </p>

            <div className="flex justify-center gap-6 flex-wrap">
              <Link
                to="/community"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                🚀 Join Community
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-500/50"
              >
                ✨ Explore Features
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">500K+</div>
                <div className="text-gray-300">Active Gamers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">50K+</div>
                <div className="text-gray-300">Daily Clips</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400">100+</div>
                <div className="text-gray-300">Tournaments</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- TRENDING CLIPS SECTION ---------------- */}
        <section className="min-h-screen flex items-center py-20 px-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                🔥 Trending Clips
              </h2>
              <div className="flex gap-4 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-lg ${
                      activeCategory === category
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-800/80 backdrop-blur-sm text-gray-300 hover:bg-gray-700/80 hover:text-white"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gamingClips.map(clip => (
                <div
                  key={clip.id}
                  className="bg-gray-800/80 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 transform hover:scale-105 group"
                >
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                      {clip.thumbnail}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/80 px-3 py-2 rounded-xl text-lg font-semibold">
                      {clip.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-white mb-3 text-xl">{clip.title}</h3>
                    <div className="flex justify-between text-base text-gray-300 mb-4">
                      <span className="bg-gray-700/50 px-3 py-1 rounded-lg">{clip.game}</span>
                      <span className="flex items-center gap-2">👁️ {clip.views}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 text-lg flex items-center gap-2">
                        ⭐ {clip.player}
                      </span>
                      <span className="text-red-400 text-lg flex items-center gap-2">
                        ❤️ {clip.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- INSTAGRAM-STYLE TRENDING FEEDS ---------------- */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
              📱 Community Feeds
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {trendingFeeds.map(feed => (
                <div
                  key={feed.id}
                  className="bg-gray-800/80 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
                >
                  {/* Feed Header */}
                  <div className="p-6 border-b border-gray-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                        {feed.authorAvatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{feed.author}</h3>
                        <p className="text-gray-400 text-sm">{feed.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Feed Image */}
                  <div className="relative">
                    <img 
                      src={feed.image} 
                      alt={feed.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>

                  {/* Feed Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-white text-xl mb-3">{feed.title}</h3>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">{feed.content}</p>
                    
                    {/* Engagement Stats */}
                    <div className="flex justify-between items-center text-base text-gray-400">
                      <div className="flex gap-6">
                        <span className="text-green-400 flex items-center gap-2">
                          👍 {feed.likes}
                        </span>
                        <span className="text-blue-400 flex items-center gap-2">
                          💬 {feed.comments}
                        </span>
                      </div>
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- TOP PLAYERS & LIVE STREAMS ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 py-20">
          {/* Top Players Section */}
          <section className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 border-2 border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-8">🏆 Top Players</h2>
            <div className="space-y-6">
              {topPlayers.map(player => (
                <div
                  key={player.rank}
                  className="bg-gray-700/50 rounded-2xl p-6 hover:bg-gray-600/50 transition-all duration-300 border-2 border-gray-600/50 hover:border-yellow-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl ${
                        player.rank === 1 ? "bg-yellow-500 text-black shadow-lg" :
                        player.rank === 2 ? "bg-gray-400 text-black shadow-lg" :
                        player.rank === 3 ? "bg-orange-500 text-black shadow-lg" : "bg-purple-500 shadow-lg"
                      }`}>
                        #{player.rank}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{player.avatar}</div>
                        <div>
                          <h3 className="font-bold text-white text-xl">{player.name}</h3>
                          <p className="text-gray-400 text-lg">{player.game}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`w-3 h-3 rounded-full ${
                          player.online ? "bg-green-500" : "bg-red-500"
                        }`}></span>
                        <span className="text-lg text-gray-400">
                          {player.online ? "Online" : "Offline"}
                        </span>
                      </div>
                      <div className="text-lg text-gray-300">
                        Level {player.level} • {player.wins} Wins
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live Streams Section */}
          <section className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 border-2 border-red-500/30">
            <h2 className="text-4xl font-bold text-white mb-8">🔴 Live Streams</h2>
            <div className="space-y-6">
              {liveStreams.map(stream => (
                <div
                  key={stream.id}
                  className="bg-gray-700/50 rounded-2xl p-6 hover:bg-gray-600/50 transition-all duration-300 border-2 border-gray-600/50 hover:border-red-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{stream.avatar}</div>
                      <div>
                        <h3 className="font-bold text-white text-xl">{stream.streamer}</h3>
                        <p className="text-gray-400">{stream.game}</p>
                        <p className="text-sm text-gray-500">{stream.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-red-400 mb-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="font-semibold">Live</span>
                      </div>
                      <div className="text-lg text-gray-300">
                        👥 {stream.viewers}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ---------------- UPCOMING EVENTS ---------------- */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
              🗓️ Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300 transform hover:scale-105">
                  <h3 className="font-bold text-white text-2xl mb-4">{event.title}</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <span>📅</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>👥</span>
                      <span>{event.participants} Players</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>💰</span>
                      <span className="text-yellow-400">{event.prize} Prize Pool</span>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-white transition-colors">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FOOTER WITH GAMERS CONNECT TEXT ---------------- */}
        <footer className="py-12 px-6 border-t border-purple-500/20">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Gamers Connect
                </h1>
                <p className="text-gray-300 mt-2">The ultimate gaming community platform</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300">Join millions of gamers worldwide</p>
                <div className="flex gap-4 mt-4">
                  <span className="text-2xl">🎮</span>
                  <span className="text-2xl">🏆</span>
                  <span className="text-2xl">🌟</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;