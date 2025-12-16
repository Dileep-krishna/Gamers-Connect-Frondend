import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SERVERURL from "../../../services/serverURL";
import { getUserProfileAPI, postCreateAPI } from "../../../services/allAPI";
 // Change this to your backend URL

const CreatePost = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    content: "",
    mediaType: "none", // none, image, video
    mediaFile: null, // preview URL
    mediaFileRaw: null, // actual FileList object for upload
    game: "",
    tags: [],
    visibility: "public", // public, friends, private
    schedulePost: false,
    scheduleTime: "",
    allowComments: true,
    allowReactions: true,
  });

  const [currentTag, setCurrentTag] = useState("");

//sample
  const popularGames = [
    "Valorant",
    "Apex Legends",
    "Call of Duty",
    "Fortnite",
    "Cyberpunk 2077",
    "League of Legends",
    "Counter-Strike 2",
    "Overwatch 2",
    "Rocket League",
    "Minecraft",
    "GTA V",
    "Rainbow Six Siege",
    "Dota 2",
    "PUBG",
    "Elden Ring",
  ];

  const handleInputChange = (field, value) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !postData.tags.includes(currentTag.trim())) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleMediaUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const fileType = files[0].type.split("/")[0];
      if (fileType === "image" || fileType === "video") {
        setPostData((prev) => ({
          ...prev,
          mediaType: fileType,
          mediaFile: URL.createObjectURL(files[0]),
          mediaFileRaw: files,
        }));
      } else {
        alert("Please upload an image or video file.");
      }
    }
  };

  const handleRemoveMedia = () => {
    setPostData((prev) => ({
      ...prev,
      mediaType: "none",
      mediaFile: null,
      mediaFileRaw: null,
    }));
  };
const handleSubmit = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to post!");
      return;
    }

    const formData = new FormData();
    formData.append("content", postData.content);
    formData.append("mediaType", postData.mediaType);
    formData.append("game", postData.game);
    formData.append("tags", JSON.stringify(postData.tags));
    formData.append("visibility", postData.visibility);
    formData.append("schedulePost", postData.schedulePost);
    formData.append("scheduleTime", postData.scheduleTime || "");
    formData.append("allowComments", postData.allowComments);
    formData.append("allowReactions", postData.allowReactions);

    if (postData.mediaFileRaw) {
      for (let i = 0; i < postData.mediaFileRaw.length; i++) {
        formData.append("uploadImages", postData.mediaFileRaw[i]);
      }
    }

    // Make the API call using your postCreateAPI function
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const res = await postCreateAPI(formData, headers);

    if (res.success) {
      alert("Post created successfully!");
      navigate("/userhome");
    } else {
      alert("Failed to create post.");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Error creating post.");
  }
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddTag();
    }
  };
  const [user, setUser] = useState(null);
  
    useEffect(() => {
      fetchUserProfile();
    }, []);
  
    const fetchUserProfile = async () => {
      try {
        const result = await getUserProfileAPI();
  
        if (result.success) {
          setUser(result.user);
  
          // 🔹 OPTIONAL: keep updated user in sessionStorage
          sessionStorage.setItem(
            "existingUser",
            JSON.stringify(result.user)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Gaming Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-gray-900/80 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/userhome')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Feed
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/userhome')}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!postData.content.trim()}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                postData.content.trim() 
                  ? 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-105' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Post
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            {/* Post Header */}
            <div className="p-6 border-b border-white/10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Create New Post
              </h1>
              <p className="text-gray-400 mt-2">Share your gaming moments with the community</p>
            </div>

            {/* Post Content Area */}
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                    <div
              className="bg-cover bg-center rounded-full w-10 h-10 border-2 border-purple-500 cursor-pointer"
              style={{
                backgroundImage: user?.profile
                  ? `url(${SERVERURL}/imguploads/${user.profile})`
                  : `url(https://i.pravatar.cc/150)`
              }}
              onClick={() => navigate('/user-profile')}
              title="User Profile"
            />
                <div>
                  <p className="font-bold text-white"> {user?.username}</p>
                  <p className="text-gray-400 text-sm"> {user?.bio}</p>
                </div>
              </div>

              {/* Content Textarea */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium">What's on your mind?</label>
                <textarea
                  value={postData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Share your epic gaming moment, ask a question, or start a discussion..."
                  className="w-full h-40 p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  maxLength={1000}
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{postData.content.length}/1000 characters</span>
                  <span className={postData.content.length > 800 ? 'text-yellow-400' : ''}>
                    {1000 - postData.content.length} remaining
                  </span>
                </div>
              </div>

              {/* Media Upload Section */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium">Add Media</label>
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-purple-500 transition-colors">
                  {postData.mediaFile ? (
                    <div className="relative">
                      {postData.mediaType === 'image' ? (
                        <img 
                          src={postData.mediaFile} 
                          alt="Upload preview" 
                          className="max-h-64 mx-auto rounded-lg"
                        />
                      ) : (
                        <video 
                          src={postData.mediaFile}
                          className="max-h-64 mx-auto rounded-lg"
                          controls
                        />
                      )}
                      <button
                        onClick={handleRemoveMedia}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                        cloud_upload
                      </span>
                      <p className="text-gray-400 mb-2">Drag & drop images or videos here</p>
                      <p className="text-gray-500 text-sm mb-4">Supports JPG, PNG, MP4, MOV (Max 50MB)</p>
                      <input
                        type="file"
                        id="media-upload"
                        accept="image/*,video/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                      <label 
                        htmlFor="media-upload"
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium cursor-pointer transition-colors"
                      >
                        Choose File
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Game Selection */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium">Game (Optional)</label>
                <select
                  value={postData.game}
                  onChange={(e) => handleInputChange('game', e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a game...</option>
                  {popularGames.map(game => (
                    <option key={game} value={game}>{game}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium">Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add tags (press Enter)"
                    className="flex-1 p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {postData.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      #{tag}
                      <button 
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Settings */}
              <div className="space-y-4 p-4 bg-gray-700/30 rounded-xl border border-white/10">
                <h3 className="text-gray-300 font-medium">Post Settings</h3>
                
                {/* Visibility */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Visibility</p>
                    <p className="text-gray-400 text-sm">Who can see this post?</p>
                  </div>
                  <select
                    value={postData.visibility}
                    onChange={(e) => handleInputChange('visibility', e.target.value)}
                    className="p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="public">🌐 Public</option>
                    <option value="friends">👥 Friends Only</option>
                    <option value="private">🔒 Private</option>
                  </select>
                </div>

                {/* Allow Comments */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Allow Comments</p>
                    <p className="text-gray-400 text-sm">Let others comment on your post</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={postData.allowComments}
                      onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Allow Reactions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Allow Reactions</p>
                    <p className="text-gray-400 text-sm">Let others react to your post</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={postData.allowReactions}
                      onChange={(e) => handleInputChange('allowReactions', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Schedule Post */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Schedule Post</p>
                    <p className="text-gray-400 text-sm">Post at a specific time</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={postData.schedulePost}
                      onChange={(e) => handleInputChange('schedulePost', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {postData.schedulePost && (
                  <div className="mt-3">
                    <label className="text-gray-300 text-sm">Schedule Time</label>
                    <input
                      type="datetime-local"
                      value={postData.scheduleTime}
                      onChange={(e) => handleInputChange('scheduleTime', e.target.value)}
                      className="w-full p-2 mt-1 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Preview Section */}
              {postData.content && (
                <div className="space-y-3">
                  <label className="text-gray-300 font-medium">Preview</label>
                  <div className="bg-gray-700/50 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="bg-cover rounded-full size-10"
                        style={{ 
                          backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMrjMtDQj-lANYcOPYEzZbmhLxNdrUCzNoHK_7G_ZLF8GUqktcYql1Al9_2jsclYlNQ8pWH0vT9rH1_tKKM6d4SX6_nfcFsA7LXpUPHXdbYAKw06WhzZ4dKct6XJVg3l1G_orHzx5DK0ik_R9LCagIq2qKErc2K708MTlNwJ_cDb6LZHWcnmDNehhg1x__mmSNYombHkmkgm-Jwi_HPpeFjaAdYyDf4Z3IX0LP2HBp1VVAIpW05IkoYtg1d0jGTJkKrTVlUlUe_5OH")' 
                        }}
                      />
                      <div>
                        <p className="font-bold text-white">GamerUsername</p>
                        <p className="text-gray-400 text-xs">Just now • {postData.game && `Playing ${postData.game}`}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap">{postData.content}</p>
                    {postData.mediaFile && (
                      <div className="mt-3">
                        {postData.mediaType === 'image' ? (
                          <img 
                            src={postData.mediaFile} 
                            alt="Post preview" 
                            className="max-w-full rounded-lg"
                          />
                        ) : (
                          <video 
                            src={postData.mediaFile}
                            className="max-w-full rounded-lg"
                            controls
                          />
                        )}
                      </div>
                    )}
                    {postData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {postData.tags.map(tag => (
                          <span key={tag} className="text-purple-400 text-sm">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-white/10 bg-gray-800/50 flex justify-between">
              <button 
                onClick={() => navigate('/userhome')}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!postData.content.trim()}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                  postData.content.trim() 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:scale-105 shadow-lg' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                Post to Feed
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Add Material Symbols stylesheet */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
        rel="stylesheet" 
      />
    </div>
  );
};

export default CreatePost;
