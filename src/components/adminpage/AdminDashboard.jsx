import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminUserManagement from './AdminUserManagement';
import ContentModeration from './ContentModeration';
import GroupManagement from './GroupManagement';
import AdminProfileEdit from './AdminProfileEdit';

import { adminUsersAPI, getAllPostsAPI } from '../../services/allAPI';
import SERVERURL from '../../services/serverURL';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [adminDetails, setAdminDetails] = useState({
    username: '',
    orginalname: '',
    bio: '',
    email: '',
    profile: '',
  });

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem('existingUser'));
    if (admin) setAdminDetails(admin);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await adminUsersAPI();
        const p = await getAllPostsAPI();
        setUsers(Array.isArray(u) ? u : []);
        setPosts(Array.isArray(p) ? p : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleEditProfile = () => {
    setShowProfileMenu(false);
    setActiveTab('profile-edit');
  };

  const handleLogout = () => {
    if (confirm('Logout?')) navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="text-gray-400">Total Users</p>
                <h3 className="text-3xl text-purple-400 font-bold">
                  {users.length}
                </h3>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="text-gray-400">Total Posts</p>
                <h3 className="text-3xl text-blue-400 font-bold">
                  {posts.length}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl">
                <p className="p-4 border-b border-gray-700 font-semibold">
                  Recent Users
                </p>
                {users.slice(0, 5).map(u => (
                  <div key={u._id} className="p-4 border-t border-gray-700">
                    <p className="font-medium">{u.username}</p>
                    <p className="text-xs text-gray-400">{u.email}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800 rounded-xl">
                <p className="p-4 border-b border-gray-700 font-semibold">
                  Recent Posts
                </p>
                {posts.slice(0, 5).map(p => (
                  <div key={p._id} className="p-4 border-t border-gray-700">
                    <p className="text-sm line-clamp-2">{p.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'users':
        return <AdminUserManagement />;

      case 'content':
        return <ContentModeration />;

      case 'groups':
        return <GroupManagement />;

      case 'profile-edit':
        return (
          <AdminProfileEdit
            adminDetails={adminDetails}
            setAdminDetails={setAdminDetails}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3"
        >
          <img
            src={
              adminDetails.profile
                ? `${SERVERURL}/imguploads/${adminDetails.profile}`
                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            }
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{adminDetails.username || 'Admin'}</span>
        </button>

        {showProfileMenu && (
          <div className="absolute right-6 top-16 bg-gray-800 rounded-xl w-44 border border-gray-700">
            <button
              onClick={handleEditProfile}
              className="w-full p-3 hover:bg-gray-700"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full p-3 text-red-400 hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* LAYOUT */}
      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-72 bg-gray-800 min-h-screen p-6 space-y-4">
          {/* 🔥 SIDEBAR PROFILE CARD */}
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={
                  adminDetails.profile
                    ? `${SERVERURL}/imguploads/${adminDetails.profile}`
                    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">
                  {adminDetails.username || 'Admin User'}
                </p>
                <p className="text-xs text-gray-400">
                  {adminDetails.bio || 'Platform Administrator'}
                </p>
              </div>
            </div>
          </div>

          {/* NAV */}
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'users', label: '👥 Users' },
            { id: 'content', label: '📝 Content' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left p-3 rounded-xl ${
                activeTab === item.id
                  ? 'bg-purple-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;