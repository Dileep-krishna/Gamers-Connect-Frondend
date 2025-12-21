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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-gray-300 hover:text-white"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        User Feed
      </h1>

      {/* PROFILE SECTION */}
      {profileLoading ? (
        <p>Loading profile...</p>
      ) : userProfile ? (
        <div className="bg-gray-800 rounded-xl p-6 mb-8 flex justify-center items-center gap-10 max-w-xl mx-auto flex-wrap">
          <button
            onClick={() => navigate(`/following/${userId}`)}
            className="text-center focus:outline-none mb-4"
          >
            <div className="text-3xl font-bold text-pink-400 cursor-pointer hover:text-pink-500">
              {userProfile.followers?.length || 0}
            </div>
            <div className="text-gray-400 text-sm">Followers</div>
          </button>

          <div className="relative text-center">
            <img
              src={
                userProfile.profile
                  ? `${SERVERURL}/imguploads/${userProfile.profile}`
                  : "https://i.pravatar.cc/150"
              }
              alt={userProfile.username}
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
            />
            {/* Username below profile picture */}
            <div className="mt-2 text-xl font-semibold text-white select-none">
              {userProfile.username}
            </div>

            {/* Follow/Unfollow Button */}
            {loggedInUserId && loggedInUserId !== userId && (
              <button
                onClick={handleFollowToggle}
                disabled={followProcessing}
                className={`mt-3 w-full px-4 py-2 rounded-lg text-white font-semibold
                  ${isFollowing ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                  transition`}
              >
                {followProcessing ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>

          <button
            onClick={() => navigate(`/following/${userId}`)}
            className="text-center focus:outline-none mb-4"
          >
            <div className="text-3xl font-bold text-purple-400 cursor-pointer hover:text-purple-500">
              {userProfile.following?.length || 0}
            </div>
            <div className="text-gray-400 text-sm">Following</div>
          </button>

          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{userPosts.length}</div>
            <div className="text-gray-400 text-sm">Posts</div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 mb-8">User profile not found.</p>
      )}

      {/* POSTS SECTION */}
      <h1 className="text-center text-4xl font-extrabold my-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Posts
      </h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : userPosts.length === 0 ? (
        <p className="text-gray-400">This user has no posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition"
            >
              <p className="text-xs text-gray-400 mb-2">{timeAgo(post.createdAt)}</p>
              <p className="text-gray-200 mb-3 line-clamp-3">{post.content}</p>

              {post.mediaFile && post.mediaFile.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                  {post.mediaFile.map((file, index) => {
                    const ext = file.split(".").pop().toLowerCase();
                    const isVideo = ["mp4", "webm", "ogg"].includes(ext);
                    const isImage = [
                      "jpg",
                      "jpeg",
                      "png",
                      "gif",
                      "webp",
                      "bmp",
                    ].includes(ext);

                    return (
                      <div
                        key={index}
                        className="w-full h-56 bg-black rounded-lg overflow-hidden"
                      >
                        {isVideo && (
                          <video
                            src={`${SERVERURL}/imguploads/${file}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls={false}
                            disablePictureInPicture
                            className="w-full h-full object-cover"
                          />
                        )}
                        {isImage && (
                          <img
                            src={`${SERVERURL}/imguploads/${file}`}
                            alt="post media"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFeed;
