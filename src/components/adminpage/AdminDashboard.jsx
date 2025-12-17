import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminUserManagement from './AdminUserManagement';
import TournamentManagement from './TournamentManagement';
import ContentModeration from './ContentModeration';
import GroupManagement from './GroupManagement';
import AdminProfileEdit from './AdminProfileEdit';
import SERVERURL from '../../services/serverURL';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // --- Lifted adminDetails state here ---
  const [adminDetails, setAdminDetails] = useState({
    username: '',
    orginalname: '',
    bio: '',
    email: '',
    profile: '',
  });

  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem('existingUser'));
    if (admin) {
      setAdminDetails(admin);
    }
  }, []);

  // Profile menu handlers
  const handleEditProfile = () => {
    setShowProfileMenu(false);
    setActiveTab('profile-edit');
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    if (confirm('Are you sure you want to logout?')) {
      navigate('/login');
    }
  };

  // Render main content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="text-center py-20 text-gray-400 select-none">
            <p className="text-4xl mb-4">🎮</p>
            <h2 className="text-3xl font-semibold mb-2">Dashboard Overview</h2>
            <p>Summary and analytics will be shown here.</p>
          </div>
        );
      case 'users':
        return <AdminUserManagement />;
      case 'tournaments':
        return <TournamentManagement />;
      case 'content':
        return <ContentModeration />;
      case 'groups':
        return <GroupManagement />;
      case 'profile-edit':
        // Pass adminDetails and setter as props
        return (
          <AdminProfileEdit
            adminDetails={adminDetails}
            setAdminDetails={setAdminDetails}
          />
        );
      default:
        return (
          <div className="text-center py-20 text-gray-400 select-none">
            <p className="text-4xl mb-4">⚙️</p>
            <h2 className="text-3xl font-semibold mb-2">
              {activeTab
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </h2>
            <p>Management interface coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-10"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-gray-900/80 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <span className="text-2xl">🎮</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-sm">Complete Platform Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-500/30">
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white border-2 border-gray-900">
                  3
                </span>
              </button>
            </div>

            <button
              onClick={() => navigate('/userhome')}
              className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl transition-all duration-300 flex items-center gap-2 border border-purple-500/30 hover:scale-105"
            >
              <span>←</span>
              Back to App
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-500/30 group"
              >
                <div className="text-right">
                  <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {adminDetails.username || "Admin User"}
                  </p>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300">
                 {adminDetails.bio || "Admin User"}
                  </p>
                </div>
                <div
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center font-bold text-white border-2 border-purple-400/50 shadow-lg group-hover:scale-110 transition-transform"
                  style={{
                    backgroundImage: adminDetails.profile
                      ? `url(${SERVERURL}/imguploads/${adminDetails.profile})`
                      : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    color: 'transparent',
                  }}
                >
                  {!adminDetails.profile && (adminDetails.username ? adminDetails.username.charAt(0).toUpperCase() : "A")}
                </div>
                <span
                  className={`transform transition-transform ${
                    showProfileMenu ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center font-bold text-white"
                        style={{
                          backgroundImage: adminDetails.profile
                            ? `url(${SERVERURL}/imguploads/${adminDetails.profile})`
                            : undefined,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          color: 'transparent',
                        }}
                      >
                        {!adminDetails.profile && (adminDetails.username ? adminDetails.username.charAt(0).toUpperCase() : "A")}
                      </div>
                      <div>
                        <p className="font-bold text-white">{adminDetails.username || "Admin User"}</p>
                        <p className="text-purple-300 text-sm">{adminDetails.email || "admin@example.com"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white"
                    >
                      <span className="text-xl">👤</span>
                      <span>Edit Profile</span>
                    </button>

                    <div className="border-t border-white/10 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/20 transition-all duration-300 text-red-400 hover:text-red-300"
                    >
                      <span className="text-xl">🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Sidebar + Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-80 bg-gray-800/90 backdrop-blur-sm min-h-screen p-6 border-r border-gray-700/50">
            {/* User Profile Card */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-4 mb-6 border border-purple-500/30">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center font-bold text-white"
                  style={{
                    backgroundImage: adminDetails.profile
                      ? `url(${SERVERURL}/imguploads/${adminDetails.profile})`
                      : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    color: 'transparent',
                  }}
                >
                  {!adminDetails.profile && (adminDetails.username ? adminDetails.username.charAt(0).toUpperCase() : "A")}
                </div>
                <div>
                  <p className="font-bold text-white">{adminDetails.username || "Admin User"}</p>
                  <p className="text-purple-300 text-sm">{adminDetails.bio || "Admin User"}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Last Login</span>
                  <span className="text-green-400">2 hours ago</span>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'overview', icon: '📊', label: 'Dashboard Overview' },
                { id: 'users', icon: '👥', label: 'User Management' },
                { id: 'tournaments', icon: '🏆', label: 'Tournaments' },
                { id: 'groups', icon: '👨‍👩‍👧‍👦', label: 'Groups Management' },
                { id: 'content', icon: '📝', label: 'Content Moderation' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300 group ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 text-white shadow-lg border border-purple-500/50'
                      : 'hover:bg-white/10 text-gray-300 hover:text-white hover:translate-x-2'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xl transition-transform duration-300 ${
                        activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium text-left">{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{renderTabContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
