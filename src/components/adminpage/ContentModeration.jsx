import React, { useState } from 'react';

const ContentModeration = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedReports, setSelectedReports] = useState([]);

  // Mock content reports data
  const reports = [
    {
      id: 1,
      type: 'post',
      content: 'This is inappropriate content that violates community guidelines...',
      reportedBy: 'AceHunter',
      reportedUser: 'ToxicPlayer',
      reason: 'Harassment',
      severity: 'high',
      status: 'pending',
      reportedAt: '2024-03-15 14:30',
      evidence: ['screenshot1.jpg', 'chat_log.txt'],
      priority: 'urgent'
    },
    {
      id: 2,
      type: 'comment',
      content: 'Spam message with external links...',
      reportedBy: 'NovaStar',
      reportedUser: 'SpamBot',
      reason: 'Spam',
      severity: 'medium',
      status: 'pending',
      reportedAt: '2024-03-15 13:15',
      evidence: ['comment_screenshot.png'],
      priority: 'medium'
    },
    {
      id: 3,
      type: 'profile',
      content: 'Inappropriate profile picture and bio...',
      reportedBy: 'ShadowWolf',
      reportedUser: 'InappropriateUser',
      reason: 'Inappropriate Content',
      severity: 'high',
      status: 'in_review',
      reportedAt: '2024-03-15 12:45',
      evidence: ['profile_screenshot.jpg'],
      priority: 'high'
    },
    {
      id: 4,
      type: 'message',
      content: 'Harassing private messages...',
      reportedBy: 'LunaRay',
      reportedUser: 'Harasser123',
      reason: 'Cyberbullying',
      severity: 'critical',
      status: 'pending',
      reportedAt: '2024-03-15 11:20',
      evidence: ['message_log.txt', 'screenshots.zip'],
      priority: 'urgent'
    },
    {
      id: 5,
      type: 'group_post',
      content: 'Misinformation and fake news...',
      reportedBy: 'RogueKnight',
      reportedUser: 'MisinfoBot',
      reason: 'Misinformation',
      severity: 'medium',
      status: 'resolved',
      reportedAt: '2024-03-14 16:30',
      evidence: ['post_screenshot.png'],
      priority: 'low'
    }
  ];

  const moderationStats = {
    totalReports: 2341,
    pending: 156,
    inReview: 45,
    resolved: 2140,
    averageResolutionTime: '2.3 hours',
    topCategory: 'Harassment',
    autoModerated: 1890
  };

  const moderationActions = [
    { action: 'Warning Issued', count: 456, icon: '⚠️' },
    { action: 'Content Removed', count: 1234, icon: '🗑️' },
    { action: 'Users Banned', count: 89, icon: '🚫' },
    { action: 'Accounts Suspended', count: 34, icon: '⏸️' },
    { action: 'Appeals Processed', count: 67, icon: '🔄' },
    { action: 'False Reports', count: 123, icon: '❌' }
  ];

  const toggleReportSelection = (reportId) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const selectAllReports = () => {
    setSelectedReports(reports.map(report => report.id));
  };

  const clearSelection = () => {
    setSelectedReports([]);
  };

  const filteredReports = reports.filter(report => 
    activeTab === 'all' || report.status === activeTab
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'from-red-500 to-pink-500';
      case 'high': return 'from-orange-500 to-red-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'from-yellow-500 to-orange-500';
      case 'in_review': return 'from-blue-500 to-cyan-500';
      case 'resolved': return 'from-green-500 to-emerald-500';
      case 'dismissed': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'post': return '📝';
      case 'comment': return '💬';
      case 'profile': return '👤';
      case 'message': return '✉️';
      case 'group_post': return '👨‍👩‍👧‍👦';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Content Moderation
          </h2>
          <p className="text-gray-400 mt-2">Review and manage reported content</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-green-500/30 hover:scale-105">
            <span>⚙️</span> Auto-Mod Settings
          </button>
          <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-blue-500/30 hover:scale-105">
            <span>📊</span> Moderation Analytics
          </button>
        </div>
      </div>

      {/* Moderation Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '🚩', label: 'Total Reports', value: moderationStats.totalReports, color: 'from-red-600/20 to-red-800/20', border: 'border-red-500/30' },
          { icon: '⏳', label: 'Pending Review', value: moderationStats.pending, color: 'from-yellow-600/20 to-yellow-800/20', border: 'border-yellow-500/30' },
          { icon: '✅', label: 'Resolved', value: moderationStats.resolved, color: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30' },
          { icon: '🤖', label: 'Auto-Moderated', value: moderationStats.autoModerated, color: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30' }
        ].map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-xl p-4 border ${stat.border} hover:scale-105 transition-transform duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value.toLocaleString()}</p>
              </div>
              <div className="text-2xl opacity-80">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Status Tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Reports', icon: '🚩' },
              { id: 'pending', label: 'Pending', icon: '⏳' },
              { id: 'in_review', label: 'In Review', icon: '🔍' },
              { id: 'resolved', label: 'Resolved', icon: '✅' },
              { id: 'dismissed', label: 'Dismissed', icon: '❌' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-purple-500/30 text-white border border-purple-500/50'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Bulk Actions */}
          {selectedReports.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">
                {selectedReports.length} report{selectedReports.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors border border-green-500/30">
                  Approve
                </button>
                <button className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors border border-red-500/30">
                  Remove
                </button>
                <button className="px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/30 transition-colors border border-yellow-500/30">
                  Escalate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-gray-800/50">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={selectedReports.length === filteredReports.length}
              onChange={selectedReports.length === filteredReports.length ? clearSelection : selectAllReports}
              className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="col-span-2 text-gray-400 font-medium text-sm">TYPE</div>
          <div className="col-span-3 text-gray-400 font-medium text-sm">CONTENT</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">SEVERITY</div>
          <div className="col-span-2 text-gray-400 font-medium text-sm">USERS</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">STATUS</div>
          <div className="col-span-2 text-gray-400 font-medium text-sm">ACTIONS</div>
        </div>

        {/* Reports List */}
        <div className="divide-y divide-white/10">
          {filteredReports.map(report => (
            <div key={report.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors group">
              {/* Checkbox */}
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedReports.includes(report.id)}
                  onChange={() => toggleReportSelection(report.id)}
                  className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Type */}
              <div className="col-span-2 flex items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getTypeIcon(report.type)}</span>
                  <span className="text-white text-sm font-medium capitalize">
                    {report.type.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="col-span-3">
                <p className="text-white font-medium line-clamp-2">{report.content}</p>
                <p className="text-gray-400 text-xs mt-1">Reason: {report.reason}</p>
                <p className="text-gray-500 text-xs">{report.reportedAt}</p>
              </div>

              {/* Severity */}
              <div className="col-span-1 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getSeverityColor(report.severity)} text-white border border-white/20`}>
                  {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                </span>
              </div>

              {/* Users */}
              <div className="col-span-2">
                <div className="text-sm">
                  <p className="text-white">
                    <span className="text-gray-400">By:</span> {report.reportedBy}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Against:</span> {report.reportedUser}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-1 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(report.status)} text-white border border-white/20`}>
                  {report.status === 'in_review' ? '🔍' : 
                   report.status === 'pending' ? '⏳' :
                   report.status === 'resolved' ? '✅' : '❌'}
                  {report.status.replace('_', ' ').charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center gap-2">
                <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="Review">
                  👁️
                </button>
                <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors" title="Approve">
                  ✅
                </button>
                <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Remove">
                  🗑️
                </button>
                <button className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors" title="Escalate">
                  ⚠️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Moderation Analytics & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Moderation Actions */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>📈</span> Moderation Actions Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moderationActions.map((action, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <p className="text-white font-semibold">{action.count.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">{action.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>⚡</span> Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300 text-sm">Avg Resolution Time</span>
              <span className="text-white font-semibold">{moderationStats.averageResolutionTime}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300 text-sm">Top Category</span>
              <span className="text-white font-semibold">{moderationStats.topCategory}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300 text-sm">Auto-Mod Rate</span>
              <span className="text-green-400 font-semibold">
                {Math.round((moderationStats.autoModerated / moderationStats.totalReports) * 100)}%
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30 text-sm">
                🚫 Mass Ban
              </button>
              <button className="p-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/30 text-sm">
                📋 Generate Report
              </button>
              <button className="p-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors border border-green-500/30 text-sm">
                🤖 AI Review
              </button>
              <button className="p-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30 text-sm">
                ⚙️ Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModeration;