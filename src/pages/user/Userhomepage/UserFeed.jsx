import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllPostsAPI, adminUsersAPI, followUserAPI } from "../../../services/allAPI";
import SERVERURL from "../../../services/serverURL";

const UserFeed = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const existingUserJSON = sessionStorage.getItem("existingUser");
  const loggedInUser = existingUserJSON ? JSON.parse(existingUserJSON) : null;
  const loggedInUserId = loggedInUser?._id;

  // Local state for follow status & processing flag
  const [isFollowing, setIsFollowing] = useState(false);
  const [followProcessing, setFollowProcessing] = useState(false);

  // Fetch all posts of this user
  const fetchUserPosts = async () => {
    try {
      const allPosts = await getAllPostsAPI();

      const filtered = allPosts.filter(
        (post) =>
          post.userId === userId || post.user === userId || post.userEmail === userId
      );

      setUserPosts(filtered);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile and set follow state
  const fetchUserProfile = async () => {
    try {
      const users = await adminUsersAPI();
      const user = users.find((u) => u._id === userId);
      setUserProfile(user || null);

      if (loggedInUserId && user) {
        setIsFollowing(user.followers?.includes(loggedInUserId));
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUserProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
    fetchUserProfile();

    // Poll every 5 seconds
    const intervalId = setInterval(() => {
      fetchUserPosts();
      fetchUserProfile();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [userId]);

  // Follow/unfollow toggle handler
  const handleFollowToggle = async () => {
    if (!loggedInUserId) {
      alert("You must be logged in to follow users.");
      return;
    }
    if (loggedInUserId === userId) {
      alert("You cannot follow yourself.");
      return;
    }

    if (followProcessing) return; // prevent multiple clicks
    setFollowProcessing(true);

    // Optimistic UI update
    setIsFollowing((prev) => !prev);
    setUserProfile((prev) => {
      if (!prev) return prev;
      const followers = prev.followers || [];
      if (isFollowing) {
        // was following, so remove loggedInUserId (unfollow)
        return {
          ...prev,
          followers: followers.filter((id) => id !== loggedInUserId),
        };
      } else {
        // was NOT following, so add loggedInUserId (follow)
        return {
          ...prev,
          followers: [...followers, loggedInUserId],
        };
      }
    });

    try {
      // Call backend to toggle follow/unfollow
      await followUserAPI(userId);
    } catch (err) {
      console.error("Error toggling follow status:", err);
      alert("Failed to update follow status.");

      // Revert UI on error
      setIsFollowing((prev) => !prev);
      setUserProfile((prev) => {
        if (!prev) return prev;
        const followers = prev.followers || [];
        if (isFollowing) {
          // revert unfollow: add loggedInUserId back
          return {
            ...prev,
            followers: [...followers, loggedInUserId],
          };
        } else {
          // revert follow: remove loggedInUserId
          return {
            ...prev,
            followers: followers.filter((id) => id !== loggedInUserId),
          };
        }
      });
    } finally {
      setFollowProcessing(false);
    }
  };

  function timeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  const isVideoFile = (file) => {
    const ext = file.split('.').pop().toLowerCase();
    return ['mp4', 'webm', 'ogg'].includes(ext);
  };

  const isImageFile = (file) => {
    const ext = file.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext);
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Gaming Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      {/* Overlay Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/90 via-purple-900/40 to-black/90 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <div className="bg-gradient-to-r from-gray-900/80 to-purple-900/50 backdrop-blur-xl border-b border-purple-500/30 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800/60 hover:bg-gray-700/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 border border-gray-700/50"
            >
              <span className="text-2xl">←</span>
              <span className="font-medium text-lg">Back to Feed</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
              PLAYER PROFILE
            </h1>
            <p className="text-gray-400 text-lg">Discover the gaming journey and achievements</p>
          </div>

          {/* PROFILE SECTION - CENTERED */}
          <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-2xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 mb-16 max-w-4xl mx-auto">
            {profileLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
              </div>
            ) : userProfile ? (
              <div className="flex flex-col items-center space-y-12">
                {/* Profile Stats Row - Above Profile */}
                <div className="flex justify-center items-center gap-16 w-full">
                  {/* Followers Count */}
                  <div 
                    onClick={() => navigate(`/following/${userId}`)}
                    className="text-center cursor-pointer group transform transition-all duration-500 hover:scale-110"
                  >
                    <div className="text-5xl font-bold text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                      {userProfile.followers?.length || 0}
                    </div>
                    <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                      Followers
                    </div>
                    <div className="mt-2 text-xs text-gray-500 group-hover:text-gray-400">Click to View</div>
                  </div>

                  {/* Following Count */}
                  <div 
                    onClick={() => navigate(`/following/${userId}`)}
                    className="text-center cursor-pointer group transform transition-all duration-500 hover:scale-110"
                  >
                    <div className="text-5xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      {userProfile.following?.length || 0}
                    </div>
                    <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                      Following
                    </div>
                    <div className="mt-2 text-xs text-gray-500 group-hover:text-gray-400">Click to View</div>
                  </div>
                </div>

                {/* Profile Picture and Info - CENTERED */}
                <div className="flex flex-col items-center space-y-8">
                  {/* Profile Picture with Glow Effect */}
                  <div className="relative">
                    {/* Outer Glow Ring */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                    
                    {/* Middle Ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-spin-slow"></div>
                    
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full p-1">
                        <div className="w-full h-full bg-black rounded-full"></div>
                      </div>
                      <img
                        src={
                          userProfile.profile
                            ? `${SERVERURL}/imguploads/${userProfile.profile}`
                            : "https://i.pravatar.cc/300"
                        }
                        alt={userProfile.username}
                        className="relative w-52 h-52 rounded-full object-cover border-4 border-gray-900"
                      />
                    </div>
                    
                    {/* Level Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center border-4 border-gray-900 shadow-2xl">
                      <span className="text-lg font-bold text-white">LVL</span>
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-white">
                      {userProfile.username}
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                      <span className="px-4 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                        {userProfile.email || "No email"}
                      </span>
                      <span className="px-4 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300 border border-blue-500/30">
                        {userProfile.role || "Player"}
                      </span>
                    </div>
                    <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                      {userProfile.bio || "No bio provided. This player prefers to let their gaming skills do the talking!"}
                    </p>
                    
                    {/* Follow/Unfollow Button */}
                    {loggedInUserId && loggedInUserId !== userId && (
                      <div className="pt-6">
                        <button
                          onClick={handleFollowToggle}
                          disabled={followProcessing}
                          className={`px-10 py-4 rounded-2xl text-xl font-bold transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl ${
                            isFollowing 
                              ? "bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 hover:shadow-red-500/40" 
                              : "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:shadow-green-500/40"
                          } ${followProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {followProcessing ? (
                            <span className="flex items-center gap-3">
                              <span className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full"></span>
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-3">
                              {isFollowing ? (
                                <>
                                  <span>👋</span>
                                  Unfollow Player
                                </>
                              ) : (
                                <>
                                  <span>🎮</span>
                                  Follow Player
                                </>
                              )}
                            </span>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Posts Count - Below Profile */}
                <div className="text-center transform transition-all duration-500 hover:scale-110">
                  <div className="text-6xl font-bold text-yellow-400">{userPosts.length}</div>
                  <div className="text-gray-300 text-xl">Gaming Posts</div>
                  <div className="mt-2 text-sm text-gray-500">Total shared moments</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">😔</div>
                <p className="text-3xl text-gray-300">Player Not Found</p>
                <p className="text-gray-500 mt-4 max-w-md mx-auto">
                  This player might have left the arena or the profile is currently unavailable.
                </p>
              </div>
            )}
          </div>

          {/* POSTS SECTION */}
          <div className="mb-12">
            {/* Section Header */}
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1"></div>
              <div className="text-center">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent px-8">
                  GAMING MOMENTS
                </h2>
                <p className="text-gray-400 mt-2">Clips, screenshots, and highlights shared by the player</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1"></div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-24">
                <div className="relative">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-pink-500"></div>
                  <div className="absolute inset-0 animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-purple-500 opacity-50" style={{ animationDirection: 'reverse' }}></div>
                </div>
              </div>
            ) : userPosts.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/30">
                <div className="inline-block p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl mb-8">
                  <span className="text-8xl">🎮</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-300 mb-4">No Gaming Posts Yet</h3>
                <p className="text-gray-500 max-w-lg mx-auto text-lg">
                  This player hasn't shared any gaming moments yet. When they do, their epic plays will appear here!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userPosts.map((post) => (
                  <div
                    key={post._id}
                    className="group relative overflow-hidden bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 transition-all duration-700 hover:border-purple-500/70 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-3"
                  >
                    {/* Game Tag */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.game || 'GAMING'}
                      </span>
                    </div>

                    {/* Time Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-xs text-gray-300">
                        {timeAgo(post.createdAt)}
                      </span>
                    </div>

                    {/* Media Content */}
                    {post.mediaFile && post.mediaFile.length > 0 && (
                      <div className="relative h-64 overflow-hidden">
                        {post.mediaFile.map((file, index) => {
                          if (isVideoFile(file)) {
                            return (
                              <video
                                key={index}
                                src={`${SERVERURL}/imguploads/${file}`}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls={false}
                                disablePictureInPicture
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                              />
                            );
                          }
                          if (isImageFile(file)) {
                            return (
                              <img
                                key={index}
                                src={`${SERVERURL}/imguploads/${file}`}
                                alt="post media"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                              />
                            );
                          }
                          return null;
                        })}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="p-6">
                      <p className="text-gray-200 line-clamp-3 mb-6 text-lg leading-relaxed">
                        {post.content}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors">
                            <span className="text-xl">👍</span>
                            <span className="font-medium">{post.likes || 0}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">
                            <span className="text-xl">💬</span>
                            <span className="font-medium">{post.comments || 0}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 hover:text-green-400 cursor-pointer transition-colors">
                            <span className="text-xl">🔄</span>
                            <span className="font-medium">{post.shares || 0}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 py-8 text-center border-t border-gray-800/50">
          <p className="text-gray-500">Virtual World Gaming Platform • Player Profile View</p>
        </div>
      </div>

      {/* Add custom spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UserFeed;