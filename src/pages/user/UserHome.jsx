import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Notifications from './Userhomepage/Notifications';
import { getAllPostsAPI, getUserProfileAPI } from '../../services/allAPI';
import SERVERURL from '../../services/serverURL';


const UserHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [posts, setPosts] = useState([]);

  // Fetch posts on mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPostsAPI();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  // Helper: format createdAt to "time ago"
  function timeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000); // seconds diff

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


  // Navigation items with active detection
  const navItems = [
    { icon: 'home', label: 'Home', path: '/userhome' },
    { icon: 'newspaper', label: 'My Feed', path: '/myfeed' },
    { icon: 'explore', label: 'Explore', path: '/explore' },
    { icon: '', label: 'Friends', path: '/friends' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
    { icon: 'help', label: 'Help & Support', path: '/help' },
    { icon: 'logout', label: 'Logout', path: '/logout' }
  ];

  // Dummy user avatar URL (replace with dynamic source)
  const userAvatarURL = 'https://i.pravatar.cc/150?img=10';

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
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Material Symbols stylesheet */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-gray-900/80 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-white">
            <button className="lg:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="flex items-center gap-3 text-white">
              <span className="material-symbols-outlined text-5xl text-purple-500 leading-none">
                hub
              </span>
              <Link to={'/home'}>
                <h2 className="text-white text-2xl font-bold">Virtual World</h2>
              </Link>
            </div>
          </div>

          <div className="flex flex-1 justify-center px-4 lg:px-8 xl:px-16">
            <div className="flex w-full max-w-lg h-10">
              <div className="flex w-full items-stretch rounded-lg h-full">
                <div className="text-gray-400 flex border-none bg-black/40 items-center justify-center pl-4 rounded-l-lg">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  className="flex w-full text-white bg-black/40 placeholder:text-gray-400 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Search games, users, posts..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications button */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex items-center justify-center rounded-lg h-10 w-10 bg-black/40 text-white/80 hover:bg-white/10 transition-colors"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <div className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                3
              </div>
            </button>

            {/* User avatar */}
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


          </div>
        </header>

        {/* Notifications Sidebar */}
        {showNotifications && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowNotifications(false)}
            />
            <div className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-gray-900 border-l border-gray-700 z-50 transform transition-transform duration-300 ease-in-out">
              <Notifications isSidebar={true} onClose={() => setShowNotifications(false)} />
            </div>
          </>
        )}

        {/* Main content */}
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 pt-20">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {/* Left Sidebar */}
            <aside className="col-span-12 lg:col-span-3">
              <div className="flex flex-col rounded-xl bg-gray-800/80 backdrop-blur-sm p-4 space-y-6 sticky top-20 h-fit">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-5">
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


                    <div className="flex flex-col">
                      <h1 className="text-white text-lg font-bold">
                        {user?.username}
                      </h1>

                      <p className="text-gray-400 mt-1">
                        {user?.bio || "No bio added"}
                      </p>

                    </div>
                  </div>

                  {/* <div className="flex flex-col gap-2">
                    <p className="text-white text-sm font-medium">XP</p>
                    <div className="rounded-full bg-gray-700 h-2">
                      <div className="h-full rounded-full bg-purple-500" style={{ width: '75%' }} />
                    </div>
                    <p className="text-gray-400 text-xs">3,450 / 5,000 XP</p>
                  </div> */}

                  {/* Navigation Menu */}
                  <nav className="flex flex-col gap-2 pt-2">
                    {navItems.map((item, index) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <button
                          key={index}
                          onClick={() => navigate(item.path)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left ${isActive ? 'bg-purple-500/30 text-white' : 'hover:bg-white/10 text-gray-300'
                            }`}
                        >
                          <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                          <p className="text-sm font-medium">{item.label}</p>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Center - Main Feed */}
            <div className="col-span-12 lg:col-span-6">
              {/* Create Post Section */}
              <div className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl sticky top-20 z-10 mb-6">
                <div className="flex flex-col w-full">
                  <div className="flex w-full items-stretch rounded-lg">
                    <div className="flex justify-end pt-3 pr-2">
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


                    </div>
                    <div className="flex flex-1 flex-col">
                      <textarea
                        className="flex w-full resize-none rounded-t-lg text-white bg-gray-700/50 border border-gray-600 placeholder:text-gray-400 pl-4 pt-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Share your latest gaming clips..."
                        rows="3"
                        readOnly
                        onClick={() => navigate('/create-post')}
                      />
                      <div className="flex border border-gray-600 bg-gray-700/50 justify-between items-center pr-4 rounded-b-lg border-t-0 pl-4 py-2">
                        <div className="flex items-center gap-1">
                          <Link to={"/create-post"}>
                            <button className="flex items-center justify-center p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                              <span className="material-symbols-outlined text-xl">image</span>
                            </button>
                          </Link>
                          <Link to={"/create-post"}>
                            <button className="flex items-center justify-center p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                              <span className="material-symbols-outlined text-xl">videocam</span>
                            </button>
                          </Link>

                        </div>
                        <button
                          onClick={() => navigate('/create-post')}
                          className="px-5 py-2 bg-purple-500 text-white text-sm font-bold rounded-lg hover:bg-purple-600 transition-colors"
                        >
                          Create Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="pb-3 sticky top-40 bg-gray-900/80 backdrop-blur-sm z-10 mb-6">
                <div className="flex border-b border-white/10 gap-8 overflow-x-auto">
                  {['Gaming Reels'].map((tab) => (
                    <button
                      key={tab}
                      className={`pb-3 pt-2 whitespace-nowrap border-b-2 transition-colors ${tab === 'following'
                        ? 'border-purple-500 text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                      <p className="text-sm font-bold capitalize">{tab}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts Container */}
              <div
                className="max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800 hover:overflow-y-auto"
                style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
              >
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎮</div>
                    <p className="text-gray-500 text-xl mb-2">No posts yet</p>
                    <p className="text-gray-400 mb-6">Be the first to share your gaming moments!</p>
                  </div>
                ) : (
                  <div id="posts-container" className="space-y-6">
                    {posts.map((post) => (
                      <div key={post._id} className="relative mb-6">
                        <div className="absolute left-4 top-8 w-4 h-4 bg-purple-500 rounded-full border-4 border-gray-900 z-10"></div>

                        {/* Activity Card */}
                        <div className="ml-12 border-l-4 border-purple-500/30 bg-purple-500/20 rounded-r-xl p-6 backdrop-blur-sm bg-gray-900/80">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🎮</span>
                              <div>
                                <span className="text-sm font-bold uppercase tracking-wider text-purple-400">
                                  Gameplay
                                </span>
                                <span className="ml-2 px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                                  {post.game || 'Game Name'}
                                </span>
                              </div>
                            </div>
                            <span className="text-gray-500 text-sm">{timeAgo(post.createdAt)}</span>
                          </div>

                          {/* Content */}
                          <p className="text-gray-200 text-lg mb-4 leading-relaxed">{post.content}</p>

                          {/* Media */}
                          {/* Media */}
                          {post.mediaFile && post.mediaFile.length > 0 && (
                            <div className="mb-4 grid grid-cols-1 gap-3">
                              {post.mediaFile.map((file, idx) => {
                                /* VIDEO */
                                if (isVideoFile(file)) {
                                  return (
                                    <video
                                      key={idx}
                                      src={`${SERVERURL}/imguploads/${file}`}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      controls={false}
                                      disablePictureInPicture
                                      controlsList="nodownload nofullscreen noremoteplayback"
                                      className="rounded-xl w-full max-h-72 object-cover"
                                    />
                                  );
                                }

                                /* IMAGE */
                                if (isImageFile(file)) {
                                  return (
                                    <img
                                      key={idx}
                                      src={`${SERVERURL}/imguploads/${file}`}
                                      alt={`media-${idx}`}
                                      className="rounded-xl w-full max-h-72 object-cover"
                                    />
                                  );
                                }

                                return null;
                              })}
                            </div>
                          )}


                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags &&
                              post.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-gray-700/70 text-gray-300 text-sm rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                          </div>

                          {/* Engagement */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                            <div className="flex items-center gap-6 text-gray-400 text-sm">
                              <div className="flex items-center gap-1">
                                <span>👍</span>
                                <span>{post.allowReactions ? '👍' : 0}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>💬</span>
                                <span>0</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <span className="text-lg">👍</span>
                              </button>
                              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <span className="text-lg">💬</span>
                              </button>
                              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <span className="text-lg">🔄</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="col-span-12 lg:col-span-3">
              <div className="space-y-6 sticky top-20 h-fit">
                {/* Online Friends */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold text-white mb-4">Online Friends</h3>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <span className="material-symbols-outlined text-4xl text-gray-500 mb-2">group</span>
                      <p className="text-gray-400 text-sm">No friends online</p>
                    </div>
                  </div>
                </div>

                {/* Live Tournaments */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold text-white mb-4">Live Tournaments</h3>
                  <div className="space-y-3">
                    <div className="bg-black/40 p-3 rounded-lg flex items-center gap-4 hover:bg-purple-500/10 transition-colors cursor-pointer">
                      <div className="w-16 h-16 bg-gray-700/50 rounded flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-white">No tournaments</p>
                        <p className="text-gray-400 text-xs">Check back soon</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sponsored Ads */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold text-white mb-4">Sponsored Ads</h3>
                  <div className="space-y-3">
                    <div className="bg-black/40 p-3 rounded-lg flex items-center gap-4 hover:bg-purple-500/10 transition-colors cursor-pointer">
                      <div className="w-16 h-16 bg-gray-700/50 rounded flex items-center justify-center">
                        <span className="text-2xl">📢</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-white">Get your game featured!</p>
                        <p className="text-gray-400 text-xs">Reach millions of gamers worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserHome;
