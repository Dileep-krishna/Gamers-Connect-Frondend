import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminUsersAPI } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

const FollowersFollowing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("followers");

  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await adminUsersAPI();
        const currentUser = users.find((u) => u._id === userId);
        setUser(currentUser);
        if (!currentUser) {
          setFollowersList([]);
          setFollowingList([]);
          setLoading(false);
          return;
        }
        const followerIds = currentUser.followers || [];
        const followingIds = currentUser.following || [];

        const followers = users.filter((u) => followerIds.includes(u._id));
        const following = users.filter((u) => followingIds.includes(u._id));

        setFollowersList(followers);
        setFollowingList(following);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  // Handler to navigate to user feed when clicking on user item
  const handleUserClick = (clickedUserId) => {
    navigate(`/userfeed/${clickedUserId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-xl">Loading connections...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-red-500/30 max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-red-400 mb-3">User Not Found</h2>
          <p className="text-gray-400 mb-6">This player might have left the arena</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const displayList = activeTab === "followers" ? followersList : followingList;
  const listTitle = activeTab === "followers" ? "Followers" : "Following";
  const listCount = activeTab === "followers" ? followersList.length : followingList.length;
  const emptyMessage = activeTab === "followers" 
    ? "No followers yet" 
    : "Not following anyone yet";
  const emptyIcon = activeTab === "followers" ? "👥" : "🔍";

  return (
    <div className="min-h-screen text-white relative">
      {/* Gaming Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/95 via-purple-900/50 to-black/95 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 to-purple-900/70 backdrop-blur-xl border-b border-purple-500/30">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">←</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{user.username}'s Network</h1>
                    <p className="text-gray-300 text-sm">Gaming connections & community</p>
                  </div>
                </button>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Active Player</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/30">
              <div className="text-4xl font-bold text-pink-400">{followersList.length}</div>
              <div className="text-gray-300 text-lg">Followers</div>
              <div className="text-gray-400 text-sm mt-2">Players who follow {user.username}</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
              <div className="text-4xl font-bold text-purple-400">{followingList.length}</div>
              <div className="text-gray-300 text-lg">Following</div>
              <div className="text-gray-400 text-sm mt-2">Players {user.username} follows</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
              <div className="text-4xl font-bold text-blue-400">
                {followersList.length + followingList.length}
              </div>
              <div className="text-gray-300 text-lg">Total Connections</div>
              <div className="text-gray-400 text-sm mt-2">Network size</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
              <button
                onClick={() => setActiveTab("followers")}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                  activeTab === "followers"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>👥</span>
                  Followers ({followersList.length})
                </span>
              </button>
              <button
                onClick={() => setActiveTab("following")}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                  activeTab === "following"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🔍</span>
                  Following ({followingList.length})
                </span>
              </button>
            </div>
          </div>

          {/* User List */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                {listTitle} <span className="text-purple-400">({listCount})</span>
              </h2>
              <div className="text-gray-400">
                Click on any player to view their profile
              </div>
            </div>

            {displayList.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl mb-8">
                  <span className="text-8xl">{emptyIcon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-4">{emptyMessage}</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {activeTab === "followers" 
                    ? "When other players follow this user, they'll appear here." 
                    : "When this user follows other players, they'll appear here."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayList.map((person) => (
                  <div
                    key={person._id}
                    onClick={() => handleUserClick(person._id)}
                    className="group relative overflow-hidden bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/70 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                  >
                    {/* Online Status */}
                    <div className="absolute top-4 right-4">
                      <div className={`flex items-center gap-2 px-3 py-1 backdrop-blur-sm rounded-full ${
                        Math.random() > 0.5 ? "bg-green-900/40 border border-green-500/40" : "bg-gray-800/60 border border-gray-600/50"
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          Math.random() > 0.5 ? "bg-green-500 animate-pulse" : "bg-gray-500"
                        }`}></div>
                        <span className="text-xs text-gray-300">
                          {Math.random() > 0.5 ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <img
                          src={
                            person.profile
                              ? `${SERVERURL}/imguploads/${person.profile}`
                              : "https://i.pravatar.cc/300"
                          }
                          alt={person.username}
                          className="relative w-20 h-20 rounded-full object-cover border-2 border-gray-700 group-hover:border-purple-500 transition-colors shadow-lg"
                        />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                        {person.username}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {person.bio || "Gaming enthusiast exploring virtual worlds"}
                      </p>

               
                    </div>

                    {/* Action Button */}
                    <div className="mt-6">
                      <button className="w-full py-2.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-blue-600/40 transition-all duration-300 border border-purple-500/30 hover:border-purple-400/50">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
         
        </div>
      </div>
    </div>
  );
};

export default FollowersFollowing;