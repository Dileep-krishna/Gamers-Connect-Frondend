import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SERVERURL from "../../../services/serverURL";

function Friends() {
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState([]);

  // Parse user inside component render, so it's fresh
  const existingUser = React.useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("existingUser"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!existingUser || !Array.isArray(existingUser.following) || existingUser.following.length === 0) {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const res = await fetch(`${SERVERURL}/get-allUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();

        const usersList = data?.data?.users || data?.users || data;
        if (!Array.isArray(usersList)) {
          throw new Error("Invalid users data");
        }
        setAllUsers(usersList);

        const followingUsers = usersList.filter((user) =>
          existingUser.following.some((fid) => fid.toString() === user._id.toString())
        );
        setFriends(followingUsers);
        
        // Simulate online friends (first 3 friends)
        setOnlineFriends(followingUsers.slice(0, Math.min(3, followingUsers.length)));
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [existingUser]);

  if (!existingUser) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400 text-center text-xl">Please login to view friends</p>
      </div>
    );
  }

  const filteredFriends = friends.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white">
      {/* Gaming Background with friends theme */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/95 via-purple-900/80 to-black/95 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 to-purple-900/70 backdrop-blur-xl border-b border-purple-500/40">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-2xl">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Gaming Friends</h1>
                  <p className="text-gray-300">Your trusted allies in virtual World</p>
                </div>
              </div>
              
              <div className="hidden md:block">
                {/* Empty div for alignment */}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-lg"></div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-purple-300">
                  <span className="text-2xl">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search your gaming friends..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-900/90 backdrop-blur-xl border border-purple-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-2xl"
                />
              </div>
              <p className="text-center text-gray-300 mt-3 text-sm">
                Find friends to squad up with
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-gray-900/60 to-purple-900/40 backdrop-blur-xl rounded-3xl border border-purple-500/30">
              <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-purple-500"></div>
                <div className="absolute inset-0 animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-pink-500 opacity-50" style={{ animationDirection: 'reverse' }}></div>
              </div>
              <p className="text-gray-200 text-xl mt-6">Loading your gaming squad...</p>
              <p className="text-gray-400 mt-2">Connecting to the virtual arena</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-gradient-to-br from-red-900/40 to-red-900/20 backdrop-blur-xl rounded-3xl border border-red-700/50">
              <div className="text-6xl mb-6">⚠️</div>
              <h3 className="text-2xl font-bold text-red-300 mb-3">Connection Error</h3>
              <p className="text-gray-300 max-w-md mx-auto">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
              >
                Try Again
              </button>
            </div>
          ) : existingUser.following.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-br from-gray-900/70 to-purple-900/50 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl">
              <div className="inline-block p-8 bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl mb-8 shadow-inner">
                <span className="text-8xl">👤</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No Gaming Friends Yet</h3>
              <p className="text-gray-300 max-w-lg mx-auto text-lg mb-8">
                Start following other players to build your gaming squad. Find players and click "Follow" on their profiles!
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/30"
              >
                <span>🔍</span>
                Explore Players
              </Link>
            </div>
          ) : (
            <>
              {/* Online Friends Section */}
              {onlineFriends.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-2 h-8 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                    <h2 className="text-2xl font-bold text-white">Recently Chatted</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 via-green-500/20 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {onlineFriends.map((friend) => (
                      <Link
                        to={`/chat/${friend._id}`}
                        key={friend._id}
                        className="group relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-purple-900/60 backdrop-blur-xl rounded-2xl border border-green-500/40 hover:border-green-400/70 transition-all duration-500 hover:scale-[1.02] shadow-2xl hover:shadow-green-500/20"
                      >
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-900/60 backdrop-blur-sm rounded-full border border-green-500/30">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500"></div>
                            <span className="text-xs text-green-300"></span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-40"></div>
                              <img
                                src={
                                  friend.profile
                                    ? `${SERVERURL}/imguploads/${friend.profile}`
                                    : "https://i.pravatar.cc/300"
                                }
                                alt={friend.username}
                                className="relative w-16 h-16 rounded-full object-cover border-2 border-green-500 shadow-lg"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                                {friend.username}
                              </h3>
                              <p className="text-gray-400 text-sm"></p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-gray-500 text-sm">
                            </div>
                            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg">
                              Message
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* All Friends Section */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                    <h2 className="text-2xl font-bold text-white">All Friends</h2>
                  </div>
                  <span className="text-gray-300 bg-gray-900/60 px-3 py-1 rounded-full text-sm">
                    {filteredFriends.length} of {friends.length} friends
                  </span>
                </div>

                {filteredFriends.length === 0 ? (
                  <div className="text-center py-12 bg-gradient-to-br from-gray-900/70 to-purple-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50">
                    <span className="text-6xl mb-4">🔍</span>
                    <p className="text-gray-300 text-lg">No friends match your search</p>
                    <p className="text-gray-500 mt-2">Try a different username</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFriends.map((friend) => (
                      <Link
                        to={`/chat/${friend._id}`}
                        key={friend._id}
                        className="group relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-purple-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/60 hover:border-purple-500/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
                      >
                        {/* Friend Status */}
                        <div className="absolute top-4 right-4">
                          <div className={`flex items-center gap-2 px-3 py-1 backdrop-blur-sm rounded-full border ${
                            onlineFriends.some(f => f._id === friend._id) 
                              ? "bg-green-900/60 border-green-500/40" 
                              : "bg-gray-900/80 border-gray-600/50"
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              onlineFriends.some(f => f._id === friend._id) 
                                ? "bg-green-500 animate-pulse shadow-lg shadow-green-500" 
                                : "bg-gray-500"
                            }`}></div>
                            <span className="text-xs text-gray-300">
                              {onlineFriends.some(f => f._id === friend._id) ? "" : "Offline"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          {/* Avatar and Name */}
                          <div className="flex flex-col items-center text-center mb-5">
                            <div className="relative mb-4">
                              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-40 transition-opacity"></div>
                              <img
                                src={
                                  friend.profile
                                    ? `${SERVERURL}/imguploads/${friend.profile}`
                                    : "https://i.pravatar.cc/300"
                                }
                                alt={friend.username}
                                className="relative w-20 h-20 rounded-full object-cover border-2 border-gray-800 group-hover:border-purple-500 transition-colors shadow-lg"
                              />
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                              {friend.username}
                            </h3>
                            <p className="text-gray-500 text-sm truncate max-w-full">
                              {""}
                            </p>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Link
                              to={`/chat/${friend._id}`}
                              className="flex-1 text-center py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-purple-500/30"
                            >
                              Message
                            </Link>
                            <Link
                              to={`/userfeed/${friend._id}`}
                              className="flex-1 text-center py-2.5 bg-gray-800/70 rounded-lg text-gray-300 text-sm font-medium hover:bg-gray-800/90 transition-colors border border-gray-700/50"
                            >
                              Profile
                            </Link>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/60 backdrop-blur-xl rounded-2xl border border-purple-500/40 p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Squad Up</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <Link
                    to="/explore"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl border border-purple-500/50 hover:border-purple-400/70 transition-colors hover:scale-[1.02]"
                  >
                    <span className="text-2xl">🔍</span>
                    <div>
                      <div className="font-medium text-white">Find More Players</div>
                      <div className="text-sm text-gray-300">Expand your gaming network</div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/create-post"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-600/30 to-red-600/30 rounded-xl border border-pink-500/50 hover:border-pink-400/70 transition-colors hover:scale-[1.02]"
                  >
                    <span className="text-2xl">📢</span>
                    <div>
                      <div className="font-medium text-white">Share Game Moment</div>
                      <div className="text-sm text-gray-300">Post your latest gameplay</div>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Friends;