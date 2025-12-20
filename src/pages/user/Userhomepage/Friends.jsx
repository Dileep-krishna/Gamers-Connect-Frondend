import React, { useEffect, useState } from "react";
import { adminUsersAPI } from "../../../services/allAPI";
import SERVERURL from "../../../services/serverURL";

function Friends() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Track followed users (UI only)
  const [followingUsers, setFollowingUsers] = useState([]);

  // Fetch all users
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const result = await adminUsersAPI();

      if (Array.isArray(result)) {
        setUsers(result);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // 🔁 Follow / Unfollow toggle (UI)
  const handleFollowToggle = (userId) => {
    setFollowingUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) // Unfollow
        : [...prev, userId] // Follow
    );
  };

  // Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white mb-4 text-center">
        Discover Gamers
      </h1>

      {/* Search Box */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search gamers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-purple-500"
        />
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-gray-300">Loading gamers...</p>
      )}

      {/* User List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const isFollowing = followingUsers.includes(user._id);

            return (
              <div
                key={user._id}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:scale-105 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user.profile
                        ? `${SERVERURL}/Imguploads/${user.profile}`
                        : "https://i.pravatar.cc/150"
                    }
                    alt="profile"
                    className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {user.bio || "Gamer | Esports Enthusiast"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-300 text-sm">
                    {user.followers?.length || 0} Followers
                  </span>

                  {/* 🔥 Follow / Following Button */}
                  <button
                    onClick={() => handleFollowToggle(user._id)}
                    className={`px-4 py-1 rounded-full text-white transition ${
                      isFollowing
                        ? "bg-gray-700 hover:bg-red-600"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          !loading && (
            <p className="text-center text-gray-300 col-span-full">
              No users found
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Friends;
