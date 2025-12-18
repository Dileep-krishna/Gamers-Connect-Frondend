import React, { useEffect, useState } from "react";
import { getAllPostsAPI, deletePostAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";
import SERVERURL from "../../services/serverURL";
import Swal from "sweetalert2";

const ContentModeration = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Fetch all posts (Admin)
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPostsAPI();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete post (Admin)


const handleDelete = async (postId) => {
  const confirmed = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (!confirmed.isConfirmed) return;

  try {
    const res = await deletePostAPI(postId); // res is the response JSON from backend

    if (res.success) {
      // Remove post from state
      setPosts((prev) => prev.filter((post) => post._id !== postId));

      Swal.fire(
        'Deleted!',
        'Post has been deleted.',
        'success'
      );
    } else {
      Swal.fire(
        'Error!',
        res.message || 'Failed to delete the post.',
        'error'
      );
    }
  } catch (error) {
    console.error("Delete error:", error);

    Swal.fire(
      'Server Error!',
      error.response?.data?.message || error.message || 'Error deleting post',
      'error'
    );
  }
};





  // 🔹 Time ago helper
  const timeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // 🔹 File helpers
  const isVideoFile = (file) =>
    ["mp4", "webm", "ogg"].includes(file.split(".").pop().toLowerCase());

  const isImageFile = (file) =>
    ["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(
      file.split(".").pop().toLowerCase()
    );

  // 🔹 Search filter
  const filteredPosts = posts.filter((post) =>
    post.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-400 hover:text-white"
      >
        ⬅ Back to Admin Dashboard
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">🛡️ Content Moderation</h1>
        <p className="text-gray-400">
          Review and manage all user-generated posts
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-400">Loading posts...</p>
      )}

      {/* Posts */}
      {!loading && filteredPosts.length === 0 ? (
        <p className="text-gray-400 text-center">No posts found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 relative"
            >
              {/* Admin Actions */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  🗑 Delete
                </button>
              </div>

              {/* Meta */}
              <p className="text-xs text-gray-400 mb-2">
                Posted {timeAgo(post.createdAt)}
              </p>

              {/* Content */}
              <p className="text-gray-200 mb-3 line-clamp-3">
                {post.content}
              </p>

              {/* Media (small preview) */}
              {post.mediaFile?.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {post.mediaFile.slice(0, 4).map((file, index) => (
                    <div
                      key={index}
                      className="w-full h-32 bg-black rounded-lg overflow-hidden"
                    >
                      {isVideoFile(file) && (
                        <video
                          src={`${SERVERURL}/imguploads/${file}`}
                          muted
                          loop
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}

                      {isImageFile(file) && (
                        <img
                          src={`${SERVERURL}/imguploads/${file}`}
                          alt="post"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentModeration;
