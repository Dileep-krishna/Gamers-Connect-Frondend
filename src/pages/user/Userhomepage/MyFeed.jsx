import React, { useEffect, useState } from "react";
import SERVERURL from "../../../services/serverURL";
import { Link } from "react-router-dom";
import { deleteuserPostAPI, getAllPostsAPI } from "../../../services/allAPI";

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

  // DELETE POST HANDLER (ADMIN)
  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deleteuserPostAPI(postId);

      // Remove post from UI
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Image Only - No White Shade */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 to-purple-900/70 backdrop-blur-xl border-b border-purple-500/30">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/userhome" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">←</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">My Gaming Feed</h1>
                    <p className="text-gray-300 text-sm">Your personal gaming moments</p>
                  </div>
                </Link>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Posts: {posts.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
              <div className="text-3xl font-bold text-purple-400">{posts.length}</div>
              <div className="text-gray-300 text-lg">Total Posts</div>
              <div className="text-gray-400 text-sm mt-2">Your gaming moments</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 shadow-2xl">
              <div className="text-3xl font-bold text-blue-400">
                {posts.reduce((acc, post) => acc + (post.mediaFile?.length || 0), 0)}
              </div>
              <div className="text-gray-300 text-lg">Media Files</div>
              <div className="text-gray-400 text-sm mt-2">Clips & screenshots</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 shadow-2xl">
              <div className="text-3xl font-bold text-green-400">
                {posts.filter(p => p.tags?.length > 0).length}
              </div>
              <div className="text-gray-300 text-lg">Tagged Posts</div>
              <div className="text-gray-400 text-sm mt-2">With gaming tags</div>
            </div>
          </div>

          {/* Posts Section */}
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-br from-gray-900/90 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl">
              <div className="inline-block p-8 bg-gradient-to-br from-gray-900 to-gray-900 rounded-3xl mb-8">
                <span className="text-8xl">🎮</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No Gaming Posts Yet</h3>
              <p className="text-gray-300 max-w-md mx-auto text-lg mb-8">
                Share your first gaming moment to start building your feed!
              </p>
              <Link
                to="/create-post"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                <span>📢</span>
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <div key={post._id} className="group relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-500 rounded-full"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-8 w-5 h-5 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full border-4 border-gray-900 z-10 shadow-lg"></div>

                  {/* Post Card */}
                  <div className="ml-16 bg-gradient-to-br from-gray-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30">
                    
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-xl">🎮</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{post.game || 'Unknown Game'}</div>
                          <div className="flex items-center gap-3 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              {post.userMail || 'Anonymous'}
                            </span>
                            <span>•</span>
                            <span>{timeAgo(post.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-600/30 to-red-600/20 backdrop-blur-sm rounded-xl text-red-300 hover:text-red-200 hover:bg-red-600/40 transition-all duration-300 border border-red-500/40 hover:border-red-400/60 shadow-lg"
                        title="Delete post"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">🗑️</span>
                          <span className="hidden md:inline">Delete</span>
                        </span>
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="mb-6 text-gray-200 text-lg leading-relaxed">{post.content}</p>

                    {/* MEDIA SECTION */}
                    {post.mediaFile && post.mediaFile.length > 0 && (
                      <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {post.mediaFile.map((file, idx) =>
                            isVideoFile(file) ? (
                              <div key={idx} className="relative rounded-xl overflow-hidden bg-black/40">
                                <video
                                  src={`${SERVERURL}/imguploads/${file}`}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 shadow-lg"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 rounded-lg text-sm">
                                  🎬 Video
                                </div>
                              </div>
                            ) : isImageFile(file) ? (
                              <div key={idx} className="relative rounded-xl overflow-hidden bg-black/40">
                                <img
                                  src={`${SERVERURL}/imguploads/${file}`}
                                  alt="post-media"
                                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 shadow-lg"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 rounded-lg text-sm">
                                  📷 Image
                                </div>
                              </div>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-gray-800/70 text-gray-300 text-sm rounded-xl border border-gray-700/50 shadow-lg"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Post Footer - Engagement */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-700/50">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors">
                          <span className="text-xl">👍</span>
                          <span className="text-sm">Like</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors">
                          <span className="text-xl">💬</span>
                          <span className="text-sm">Comment</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors">
                          <span className="text-xl">🔄</span>
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                      
                      <div className="text-gray-400 text-sm">
                        {post.createdAt && new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 bg-gradient-to-br from-gray-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Manage Your Feed</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                to="/create-post"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl border border-purple-500/50 hover:border-purple-400/70 transition-colors hover:scale-[1.02] shadow-lg"
              >
                <span className="text-2xl">📢</span>
                <div>
                  <div className="font-medium text-white">Create New Post</div>
                  <div className="text-sm text-gray-300">Share your latest gaming moment</div>
                </div>
              </Link>
              
              <Link
                to="/explore"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-xl border border-gray-700/50 hover:border-gray-600/70 transition-colors hover:scale-[1.02] shadow-lg"
              >
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="font-medium text-white">Explore Community</div>
                  <div className="text-sm text-gray-300">Discover other players' posts</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFeed;