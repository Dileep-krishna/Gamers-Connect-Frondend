import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminUserManagement from './AdminUserManagement';
import TournamentManagement from './TournamentManagement';
import ContentModeration from './ContentModeration';
import GroupManagement from './GroupManagement';
import AdminProfileEdit from './AdminProfileEdit';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock data for admin dashboard
  const dashboardStats = {
    totalUsers: 12543,
    activeUsers: 8421,
    totalTournaments: 156,
    totalGroups: 892,
    reportedContent: 23,
    pendingApprovals: 45,
    totalRevenue: 12560,
    systemHealth: '98%'
  };

  const recentActivities = [
    { id: 1, user: 'AceHunter', action: 'created tournament', target: 'Valorant Championship', time: '2 mins ago', type: 'tournament' },
    { id: 2, user: 'NovaStar', action: 'reported content', target: 'Inappropriate post', time: '5 mins ago', type: 'report' },
    { id: 3, user: 'ShadowWolf', action: 'created group', target: 'Cyberpunk Fans', time: '10 mins ago', type: 'group' },
    { id: 4, user: 'RogueKnight', action: 'joined platform', target: 'New user', time: '15 mins ago', type: 'user' },
    { id: 5, user: 'System', action: 'maintenance completed', target: 'Server update', time: '1 hour ago', type: 'system' }
  ];

  const pendingActions = [
    { id: 1, type: 'user_verification', count: 12, priority: 'high' },
    { id: 2, type: 'tournament_approval', count: 8, priority: 'medium' },
    { id: 3, type: 'group_moderation', count: 15, priority: 'high' },
    { id: 4, type: 'content_reports', count: 23, priority: 'critical' },
    { id: 5, type: 'friend_requests', count: 45, priority: 'low' },
    { id: 6, type: 'system_alerts', count: 3, priority: 'critical' }
  ];

  const quickStats = {
    onlineUsers: 2845,
    activeTournaments: 34,
    liveGroups: 567,
    newFriendships: 189
  };

  // Graph data for platform analytics
  const platformData = {
    userGrowth: [65, 78, 90, 81, 56, 55, 40],
    revenue: [30, 45, 52, 38, 60, 75, 80],
    engagement: [80, 75, 82, 78, 85, 88, 90],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  };

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

//   const handleSettings = () => {
//     setShowProfileMenu(false);
//     setActiveTab('');
//   };

  // Render the appropriate content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'users':
        return <AdminUserManagement />;
      case 'tournaments':
        return <TournamentManagement />;
      case 'content':
        return <ContentModeration />;
      case 'groups':
        return <GroupManagement />;
      case 'profile-edit':
        return <AdminProfileEdit />;
      default:
        return renderDefaultTab();
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Platform Overview
        </h2>
        <div className="flex gap-3">
          <button className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-purple-500/30 hover:scale-105">
            <span>📥</span> Export Report
          </button>
          <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-blue-500/30 hover:scale-105">
            <span>🔄</span> Refresh Data
          </button>
        </div>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: '👥', label: 'Total Users', value: dashboardStats.totalUsers, change: '+12%', color: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/30' },
          { icon: '🏆', label: 'Active Tournaments', value: dashboardStats.totalTournaments, change: `${quickStats.activeTournaments} live`, color: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30' },
          { icon: '👨‍👩‍👧‍👦', label: 'Total Groups', value: dashboardStats.totalGroups, change: `${quickStats.liveGroups} active`, color: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30' },
          { icon: '⚠️', label: 'Pending Actions', value: dashboardStats.pendingApprovals, change: 'Requires attention', color: 'from-orange-600/20 to-orange-800/20', border: 'border-orange-500/30' }
        ].map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-5 border ${stat.border} hover:scale-105 transition-transform duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value.toLocaleString()}</p>
              </div>
              <div className="text-3xl opacity-80">{stat.icon}</div>
            </div>
            <div className={`mt-3 text-sm flex items-center gap-1 ${
              stat.label.includes('Pending') ? 'text-red-400' : 'text-green-400'
            }`}>
              <span>↗</span> {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Platform Analytics Graph */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Platform Analytics Graph */}
        <div className="xl:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>📈</span> Platform Analytics
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {platformData.userGrowth.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-400 mb-2">{platformData.labels[index]}</div>
                <div className="flex gap-1 w-full justify-center" style={{ height: '180px' }}>
                  {/* User Growth */}
                  <div 
                    className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t w-4 transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${value}%` }}
                    title={`Users: ${value}%`}
                  />
                  {/* Revenue */}
                  <div 
                    className="bg-gradient-to-t from-green-600 to-green-400 rounded-t w-4 transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${platformData.revenue[index]}%` }}
                    title={`Revenue: ${platformData.revenue[index]}%`}
                  />
                  {/* Engagement */}
                  <div 
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-4 transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${platformData.engagement[index]}%` }}
                    title={`Engagement: ${platformData.engagement[index]}%`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-t from-purple-600 to-purple-400 rounded"></div>
              <span className="text-xs text-gray-400">User Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-t from-green-600 to-green-400 rounded"></div>
              <span className="text-xs text-gray-400">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded"></div>
              <span className="text-xs text-gray-400">Engagement</span>
            </div>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>⏳</span> Pending Actions
            </h3>
            <span className="text-red-400 text-sm font-bold">Urgent</span>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pendingActions.map(action => (
              <div key={action.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    action.priority === 'critical' ? 'bg-red-500/20 border border-red-500/30' :
                    action.priority === 'high' ? 'bg-orange-500/20 border border-orange-500/30' :
                    action.priority === 'medium' ? 'bg-yellow-500/20 border border-yellow-500/30' : 
                    'bg-gray-500/20 border border-gray-500/30'
                  }`}>
                    <span className={
                      action.priority === 'critical' ? 'text-red-400' :
                      action.priority === 'high' ? 'text-orange-400' :
                      action.priority === 'medium' ? 'text-yellow-400' : 'text-gray-400'
                    }>
                      {action.type === 'user_verification' ? '👤' :
                       action.type === 'tournament_approval' ? '🏆' :
                       action.type === 'group_moderation' ? '👨‍👩‍👧‍👦' :
                       action.type === 'content_reports' ? '🚩' :
                       action.type === 'friend_requests' ? '🤝' : '⚠️'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm capitalize">{action.type.replace('_', ' ')}</p>
                    <p className="text-gray-400 text-xs">{action.count} items pending</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-xs transition-all duration-300 opacity-0 group-hover:opacity-100">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>🕒</span> Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-all duration-300 group">
                <div className={`p-2 rounded-lg mt-1 ${
                  activity.type === 'tournament' ? 'bg-purple-500/20 border border-purple-500/30' :
                  activity.type === 'report' ? 'bg-red-500/20 border border-red-500/30' :
                  activity.type === 'group' ? 'bg-blue-500/20 border border-blue-500/30' :
                  activity.type === 'user' ? 'bg-green-500/20 border border-green-500/30' : 
                  'bg-gray-500/20 border border-gray-500/30'
                }`}>
                  <span className={
                    activity.type === 'tournament' ? 'text-purple-400' :
                    activity.type === 'report' ? 'text-red-400' :
                    activity.type === 'group' ? 'text-blue-400' :
                    activity.type === 'user' ? 'text-green-400' : 'text-gray-400'
                  }>
                    {activity.type === 'tournament' ? '🏆' :
                     activity.type === 'report' ? '🚩' :
                     activity.type === 'group' ? '👨‍👩‍👧‍👦' :
                     activity.type === 'user' ? '👤' : '⚙️'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    <span className="text-purple-400">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-gray-400 text-xs">{activity.target}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
                <button className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/10">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-xl p-4 border border-pink-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New Friendships</p>
                <p className="text-xl font-bold text-white">{quickStats.newFriendships}</p>
              </div>
              <div className="text-2xl">🤝</div>
            </div>
            <div className="mt-2 text-green-400 text-sm text-xs">Today</div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Content Reports</p>
                <p className="text-xl font-bold text-white">{dashboardStats.reportedContent}</p>
              </div>
              <div className="text-2xl">🚩</div>
            </div>
            <div className="mt-2 text-red-400 text-sm text-xs">Needs review</div>
          </div>

          <div className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Platform Revenue</p>
                <p className="text-xl font-bold text-white">${dashboardStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
            <div className="mt-2 text-green-400 text-sm text-xs">This month</div>
          </div>

          <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">System Alerts</p>
                <p className="text-xl font-bold text-white">3</p>
              </div>
              <div className="text-2xl">⚠️</div>
            </div>
            <div className="mt-2 text-red-400 text-sm text-xs">Critical</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefaultTab = () => (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {activeTab.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </h2>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-50">
            {activeTab === 'tournaments' ? '🏆' :
             activeTab === 'groups' ? '👨‍👩‍👧‍👦' :
             activeTab === 'friends' ? '🤝' :
             activeTab === 'content' ? '📝' :
             activeTab === 'notifications' ? '🔔' :
             activeTab === 'reports' ? '📈' : '⚙️'}
          </div>
          <p className="text-gray-400 text-lg">
            {activeTab.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} management interface
          </p>
          <p className="text-gray-500 text-sm mt-2">Advanced tools and analytics coming soon...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Gaming Background Image */}
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
                  <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">Admin User</p>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300">Super Administrator</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center font-bold text-white border-2 border-purple-400/50 shadow-lg group-hover:scale-110 transition-transform">
                  A
                </div>
                <span className={`transform transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center font-bold text-white">
                        A
                      </div>
                      <div>
                        <p className="font-bold text-white">Admin User</p>
                        <p className="text-purple-300 text-sm">admin@gamehub.com</p>
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
                    
                    {/* <button 
                      onClick={handleSettings}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white"
                    >
                      <span className="text-xl"></span>
                      <span></span>
                    </button> */}
                    
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

        <div className="flex">
          {/* Enhanced Sidebar */}
          <aside className="w-80 bg-gray-800/90 backdrop-blur-sm min-h-screen p-6 border-r border-gray-700/50">
            {/* User Profile Card */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-4 mb-6 border border-purple-500/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center font-bold text-white">
                  A
                </div>
                <div>
                  <p className="font-bold text-white">Admin User</p>
                  <p className="text-purple-300 text-sm">Super Admin</p>
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
                { id: 'overview', icon: '📊', label: 'Dashboard Overview', badge: null },
                { id: 'users', icon: '👥', label: 'User Management', badge: '12' },
                { id: 'tournaments', icon: '🏆', label: 'Tournaments', badge: '8' },
                { id: 'groups', icon: '👨‍👩‍👧‍👦', label: 'Groups Management', badge: '15' },
                { id: 'content', icon: '📝', label: 'Content Moderation', badge: '23' },
                // { id: 'profile-edit', icon: '👤', label: 'Edit Profile', badge: null },
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
                    <span className={`text-xl transition-transform duration-300 ${
                      activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="font-medium text-left">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-6 text-center font-bold border border-red-400/50">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* System Status */}
            <div className="mt-8 p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700/50">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <span className="text-green-400">🖥️</span> System Status
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Server Health</span>
                    <span className="text-green-400 font-bold">{dashboardStats.systemHealth}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: dashboardStats.systemHealth }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="text-green-400 font-bold text-lg">{quickStats.onlineUsers}</div>
                    <div className="text-gray-400 text-xs">Online Now</div>
                  </div>
                  <div className="text-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <div className="text-blue-400 font-bold text-lg">{quickStats.activeTournaments}</div>
                    <div className="text-gray-400 text-xs">Live Events</div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                  <span>Uptime: 99.8%</span>
                  <span>Load: 45%</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;