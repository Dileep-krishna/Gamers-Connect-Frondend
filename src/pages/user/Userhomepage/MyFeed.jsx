import React, { useEffect, useState } from "react";
import { getAllPostsAPI } from "../../../services/allAPI";
import SERVERURL from "../../../services/serverURL";
import { Link } from "react-router-dom";

const MyFeed = () => {
  const [posts, setPosts] = useState([]);

  // Logged-in user
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
  const loggedInEmail = existingUser?.email || "";

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPostsAPI();

        // show only logged-in user's posts
        const filteredPosts = data.filter(
          (post) => post.userMail === loggedInEmail
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, [loggedInEmail]);

  // Time ago
  const timeAgo = (dateString) => {
    const diff = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // File type helpers
  const isVideoFile = (file) =>
    ["mp4", "webm", "ogg"].includes(file.split(".").pop().toLowerCase());

  const isImageFile = (file) =>
    ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
      file.split(".").pop().toLowerCase()
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542751371-adc38448a05e")',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto p-4">
        {/* Back */}
        <Link to="/userhome">
          <button className="mb-6 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
            ⬅ Back to Home
          </button>
        </Link>

        {/* Feed */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl">🎮</div>
            <p className="mt-4">No posts yet</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="mb-8 relative">
              <div className="ml-12 bg-gray-800/80 p-6 rounded-xl border-l-4 border-purple-500">

                {/* Header */}
                <div className="flex justify-between mb-3">
                  <span className="text-purple-400 font-bold">
                    {post.game || "Gameplay"}
                  </span>
                  <span className="text-sm text-gray-400">
                    {timeAgo(post.createdAt)}
                  </span>
                </div>

                {/* Content */}
                <p className="mb-4 text-gray-200">{post.content}</p>

                {/* MEDIA SECTION */}
                {post.mediaFile && post.mediaFile.length > 0 && (
                  <div className=" grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {post.mediaFile.map((file, idx) =>
                      isVideoFile(file) ? (
                        <video
                          key={idx}
                          src={`${SERVERURL}/imguploads/${file}`}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="rounded-xl w-full max-h-64 object-cover"
                        />
                      ) : isImageFile(file) ? (
                        <img
                          key={idx}
                          src={`${SERVERURL}/imguploads/${file}`}
                          alt="post-media"
                          className="rounded-xl w-full max-h-64 object-cover"
                        />
                      ) : null
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  {post.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 text-gray-400 border-t pt-3">
                  <span>👍</span>
                  <span>💬</span>
                  <span>🔄</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyFeed;
