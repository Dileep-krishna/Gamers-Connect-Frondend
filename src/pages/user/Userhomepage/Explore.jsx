import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPostsAPI, adminUsersAPI } from "../../../services/allAPI";
import SERVERURL from "../../../services/serverURL";

function timeAgo(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diff = Math.floor((now - postDate) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const Explore = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]); // For user search results
  const [search, setSearch] = useState("");

  // Fetch all posts on mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPostsAPI();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  // Fetch users when search changes (debounced is better, but simple here)
  useEffect(() => {
    async function fetchUsers() {
      if (search.trim() === "") {
        setUsers([]);
        return;
      }
      try {
        const data = await adminUsersAPI();
        // Filter users by username matching search text
        const filteredUsers = data.filter((user) =>
          user.username.toLowerCase().includes(search.toLowerCase())
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, [search]);

  // Filter posts by content matching search
  const filteredPosts = posts.filter((post) =>
    post.content?.toLowerCase().includes(search.toLowerCase())
  );

  // Helpers to identify file types
  const isVideoFile = (file) =>
    ["mp4", "webm", "ogg"].includes(file.split(".").pop().toLowerCase());

  const isImageFile = (file) =>
    ["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(
      file.split(".").pop().toLowerCase()
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-gray-300 hover:text-white"
      >
        ⬅ Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Explore
        </h1>
        <p className="text-gray-400">
          Discover posts from gamers around the world
        </p>
      </div>

      <div className="mb-10 relative">
        <input
          type="text"
          placeholder="Search posts or users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />

        {/* SHOW USER SEARCH RESULTS DROPDOWN */}
        {users.length > 0 && (
          <div className="absolute z-20 bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto w-full">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => navigate(`/userfeed/${user._id}`)}
                className="cursor-pointer px-4 py-2 hover:bg-purple-600 flex items-center gap-3"
              >
                <img
                  src={
                    user.profile
                      ? `${SERVERURL}/imguploads/${user.profile}`
                      : "https://i.pravatar.cc/40"
                  }
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{user.username}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">🌍 Explore Posts</h2>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-400 text-center">
          {search ? "No matching posts found" : "No posts available"}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition"
            >
              {/* Post time */}
              <p className="text-xs text-gray-400 mb-2">{timeAgo(post.createdAt)}</p>

              {/* Post content */}
              <p className="text-gray-200 mb-3 line-clamp-3">{post.content}</p>

              {/* Media rendering */}
              {post.mediaFile && post.mediaFile.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                  {post.mediaFile.map((file, index) => {
                    const ext = file.split(".").pop().toLowerCase();
                    const isVideo = isVideoFile(file);
                    const isImage = isImageFile(file);

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

export default Explore;
