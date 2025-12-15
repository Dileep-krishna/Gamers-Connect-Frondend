import React from "react";
import { useNavigate } from "react-router-dom"; // ⬅ FIXED: Import navigate

// ---------------------
// Dummy User Activity
// ---------------------
const userActivity = [
  {
    id: 1,
    type: "gameplay",
    time: "1h ago",
    text: "Just uploaded an insane clutch moment from my latest Valorant match! 🎮🔥",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    game: "Valorant",
    likes: 24,
    comments: 8,
    stats: { kills: 32, deaths: 5, assists: 12 }
  },
  {
    id: 2,
    type: "achievement",
    time: "3h ago",
    text: "Unlocked the Elite Sniper Badge! Perfect headshots in 10 consecutive matches 🏅",
    icon: "🎯",
    rarity: "epic",
    xp: 250
  },
  {
    id: 3,
    type: "status",
    time: "5h ago",
    text: "Now playing: Cyberpunk 2077: Phantom Liberty. The new updates are incredible! 🌃",
    game: "Cyberpunk 2077",
    status: "playing",
    hours: "4.2h"
  },
  {
    id: 4,
    type: "level_up",
    time: "Yesterday",
    text: "Level up! Reached Level 25 in Apex Legends 🚀",
    game: "Apex Legends",
    level: 25,
    rewards: ["Legend Token", "Crafting Materials"]
  },
  {
    id: 5,
    type: "screenshot",
    time: "Yesterday",
    text: "Captured this beautiful sunset moment in The Witcher 3. What a masterpiece! 🌅",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    game: "The Witcher 3",
    likes: 42,
    comments: 15
  },
  {
    id: 6,
    type: "friend_activity",
    time: "2 days ago",
    text: "Played with xShadow and LunaRay - dominated the ranked matches! 💪",
    friends: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    ],
    result: "Victory",
    matches: 5
  }
];

// ---------------------
// Activity Card Component
// ---------------------
const ActivityCard = ({ activity }) => {
  const getTypeStyles = (type) => {
    const styles = {
      gameplay: { bg: "bg-purple-500/20", border: "border-purple-500/30", icon: "🎮", text: "text-purple-400" },
      achievement: { bg: "bg-yellow-500/20", border: "border-yellow-500/30", icon: "🏆", text: "text-yellow-400" },
      status: { bg: "bg-blue-500/20", border: "border-blue-500/30", icon: "🔴", text: "text-blue-400" },
      level_up: { bg: "bg-green-500/20", border: "border-green-500/30", icon: "⭐", text: "text-green-400" },
      screenshot: { bg: "bg-pink-500/20", border: "border-pink-500/30", icon: "📸", text: "text-pink-400" },
      friend_activity: { bg: "bg-orange-500/20", border: "border-orange-500/30", icon: "👥", text: "text-orange-400" }
    };
    return styles[type] || styles.gameplay;
  };

  const typeStyle = getTypeStyles(activity.type);

  return (
    <div className={`border-l-4 ${typeStyle.border} ${typeStyle.bg} rounded-r-xl p-6 mb-6 backdrop-blur-sm bg-gray-900/80 hover:bg-gray-800/80 transition-all duration-300 shadow-lg hover:shadow-xl`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{typeStyle.icon}</span>
          <div>
            <span className={`text-sm font-bold uppercase tracking-wider ${typeStyle.text}`}>
              {activity.type.replace('_', ' ')}
            </span>
            {activity.game && (
              <span className="ml-2 px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                {activity.game}
              </span>
            )}
          </div>
        </div>
        <span className="text-gray-500 text-sm">{activity.time}</span>
      </div>

      {/* Activity Text */}
      <p className="text-gray-200 text-lg mb-4 leading-relaxed">{activity.text}</p>

      {/* Game Stats */}
      {activity.stats && (
        <div className="flex gap-4 mb-4 p-3 bg-gray-800/50 rounded-lg">
          {Object.entries(activity.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-white font-bold text-lg">{value}</div>
              <div className="text-gray-400 text-xs uppercase">{key}</div>
            </div>
          ))}
        </div>
      )}

      {/* Achievement */}
      {activity.type === "achievement" && (
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activity.icon}</span>
            <div>
              <div className="text-white font-semibold">+{activity.xp} XP</div>
              <div className={`text-xs font-bold ${activity.rarity === 'epic' ? 'text-purple-400' : 'text-yellow-400'}`}>
                {activity.rarity?.toUpperCase()} ACHIEVEMENT
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Level Up */}
      {activity.type === "level_up" && (
        <div className="flex items-center gap-4 mb-4 p-3 bg-gray-800/50 rounded-lg">
          <div className="text-3xl">🎯</div>
          <div>
            <div className="text-white font-semibold">Level {activity.level} Unlocked!</div>
            <div className="text-gray-400 text-sm">Rewards: {activity.rewards?.join(', ')}</div>
          </div>
        </div>
      )}

      {/* Friend Activity */}
      {activity.type === "friend_activity" && (
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {activity.friends?.map((friend, index) => (
                <img
                  key={index}
                  src={friend}
                  alt="Friend"
                  className="w-8 h-8 rounded-full border-2 border-gray-800"
                />
              ))}
            </div>
            <div>
              <div className={`text-sm font-bold ${activity.result === 'Victory' ? 'text-green-400' : 'text-red-400'}`}>
                {activity.result}
              </div>
              <div className="text-gray-400 text-xs">{activity.matches} matches played</div>
            </div>
          </div>
        </div>
      )}

      {/* Status */}
      {activity.type === "status" && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-800/50 rounded-lg">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="text-gray-300 text-sm">
            Playing for {activity.hours} • {activity.game}
          </div>
        </div>
      )}

      {/* Image */}
      {activity.image && (
        <div className="mb-4">
          <img
            src={activity.image}
            alt="activity"
            className="w-full h-64 object-cover rounded-xl border border-gray-700 shadow-lg"
          />
        </div>
      )}

      {/* Engagement */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
        <div className="flex items-center gap-6 text-gray-400 text-sm">
          {(activity.likes || activity.comments) && (
            <>
              {activity.likes && (
                <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                  <span>👍</span>
                  <span>{activity.likes}</span>
                </div>
              )}
              {activity.comments && (
                <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                  <span>💬</span>
                  <span>{activity.comments}</span>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
            <span className="text-lg">👍</span>
          </button>
          <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
            <span className="text-lg">💬</span>
          </button>
          <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
            <span className="text-lg">🔄</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------------
// My Feed Page
// ---------------------
const MyFeed = () => {

  const navigate = useNavigate();  // ⬅ FIXED

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">

        {/* Back Button — FIXED */}
        <button
          onClick={() => navigate("/userhome")}
          className="mb-6 px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg border border-gray-700 transition-all duration-200 flex items-center gap-2"
        >
          <span className="text-xl">⬅</span> Back to Home
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <span className="text-3xl">📊</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                My Gaming Activity
              </h1>
              <p className="text-gray-400">Track your gaming journey and achievements</p>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Activities", value: "6", icon: "📝" },
              { label: "Games", value: "4", icon: "🎮" },
              { label: "Achievements", value: "1", icon: "🏆" },
              { label: "This Week", value: "3", icon: "📅" }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-700/50">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-blue-500/50"></div>

          <div className="space-y-1">
            {userActivity.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-gray-500 text-xl mb-2">No activity yet</p>
                <p className="text-gray-400">Start playing and sharing your gaming moments!</p>
              </div>
            ) : (
              userActivity.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute left-4 top-8 w-4 h-4 bg-purple-500 rounded-full border-4 border-gray-900 z-10"></div>
                  <div className="ml-12">
                    <ActivityCard activity={item} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyFeed;
