import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notifications from './Userhomepage/Notifications';

const UserHome = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample posts data - you can expand this with more posts
  const samplePosts = [
    {
      id: 1,
      user: 'ProPlayer99',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFW6KEDHLirgS5Gyj1mzTzv-WXUI29I856vIteJNHnxZHxXZdVm0YT89WxmomvA_GpQ5314Y1grVHef74657rRmWi3CxmzgkEpaio_MfqOt33sQh4EKCO4wI-7K-w-mTVw_F3pNSxOf2TYmnSYFzqSoNyPqxav2CkWRBIDW8KvjzR2Gynw8TG_TS8rFNGKwgmCRdzel1jwF792HerV7wJa6lbSfSqCtdo7WNeEFx5TqIG2f8baWNvRuPnuadKbZiYXSuzkPO0QeDC1',
      time: '2 hours ago',
      game: 'Cyberpunk 2077',
      content: 'Just pulled off this insane clutch in the final round. My heart is still pounding! 🚀 #Cyberpunk2077 #GamingClips',
      media: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmWzyfmanSnhW-dits2Q6k0dFLskPB1Hx6iVZMyR7o4afQpRab_kgQmc8cqv6AD_Q96hhvmHgI9uPniZZjxBWJRekrlKkK2s-pEseZcjAPo71KG2ce4rY_jLi7f47Ha_bjMAN67f34i6JiRcMKVvmB4_hZiPGGd9puSwpDX-XSlQUyAORNqNe9F42DgZE8-au-JTCzCUNM8PPl2JOAAYY4dhHTHxOr1WjW_LUfTStfnYVcWQAZukfPjHnEo4YDgaiSrEQW31i-t04X',
      likes: '12k',
      comments: 432,
      shares: 189,
      reactions: [
        { type: 'GG', count: '12k', icon: 'local_fire_department' },
        { type: 'Clutch', count: '5.2k', icon: 'bolt' },
        { type: 'Owned', count: '2.1k', icon: 'skull' }
      ]
    },
    {
      id: 2,
      user: 'AceHunter',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMrjMtDQj-lANYcOPYEzZbmhLxNdrUCzNoHK_7G_ZLF8GUqktcYql1Al9_2jsclYlNQ8pWH0vT9rH1_tKKM6d4SX6_nfcFsA7LXpUPHXdbYAKw06WhzZ4dKct6XJVg3l1G_orHzx5DK0ik_R9LCagIq2qKErc2K708MTlNwJ_cDb6LZHWcnmDNehhg1x__mmSNYombHkmkgm-Jwi_HPpeFjaAdYyDf4Z3IX0LP2HBp1VVAIpW05IkoYtg1d0jGTJkKrTVlUlUe_5OH',
      time: '4 hours ago',
      game: 'Valorant',
      content: 'New personal record! 35 kills in ranked match. The grind is paying off! 💪 #Valorant #Ranked',
      media: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      likes: '8.5k',
      comments: 324,
      shares: 156,
      reactions: [
        { type: 'Sick', count: '8.5k', icon: 'sick' },
        { type: 'Pro', count: '3.7k', icon: 'military_tech' },
        { type: 'Wow', count: '1.2k', icon: 'sentiment_excited' }
      ]
    },
    {
      id: 3,
      user: 'NovaStar',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ81XyOPSMVcMhs7hkzhh1OP3lVLAyiM4NedU0tkgo7gVZlTdJSB4Nz7Qg6yx9DHFLukoXnco_PNte1bWVxNDiH13YKLSf0VWxYwWc1W0foMWjmWf4Xkl2nr1NTSq18jrlfE7dswZdisfD63J8-noDA45sFDrneYfn0crrbIjIChlvAw-0mYhmRv_oO3Ll64RzjyEAMdFMchmrcinCnrG0nM-9tbi19Eaxb7F7mLe0Q6hymr86yQcw_l0DSDdvpjStbX2cCZkQYKlJ',
      time: '6 hours ago',
      game: 'Apex Legends',
      content: 'Team wipe with the new legend! This season is absolutely wild! 🔥 #ApexLegends #Season15',
      media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      likes: '15.2k',
      comments: 892,
      shares: 421,
      reactions: [
        { type: 'Fire', count: '15.2k', icon: 'local_fire_department' },
        { type: 'OP', count: '7.8k', icon: 'psychology' },
        { type: 'Clean', count: '4.3k', icon: 'auto_awesome' }
      ]
    },
    {
      id: 4,
      user: 'ShadowWolf',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsxhDWbn1PYUcBXn5sRqjHtN7RNU-d-AdzY3dABS1_eHKrx498rN1mbwcCEfaFiZoROpP6da1oxJNxm_b9sX9qi-EqYi1gYNHlnVFvkO776yxRebrOZG4_z0U0PsP_F0TCwaMfT-wuMajGRRLPIeWrZfT1sxzopu1UrgIymf72XLvMf8RwVxedhXuMAGoFUfK-91EWwNVCraHM3GY6f1hcgE17HFoXo--fWzuxdpi04L5aDnRy3FfUMdzc3hfO1v51Vex8cXn8r2Kp',
      time: '8 hours ago',
      game: 'Call of Duty',
      content: 'Just hit Grandmaster rank! The journey was tough but worth it. Thanks to my squad! 🏆 #COD #RankedPlay',
      media: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      likes: '22.4k',
      comments: 1567,
      shares: 892,
      reactions: [
        { type: 'GG', count: '22.4k', icon: 'local_fire_department' },
        { type: 'Respect', count: '12.1k', icon: 'workspace_premium' },
        { type: 'Goals', count: '8.9k', icon: 'flag' }
      ]
    },
    {
      id: 5,
      user: 'LunaRay',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIsweGKG2fBIIM_haiWr6dISPPlvlyZVSz8EGPPhUiu48IbBfixUY9cgbO5e8U6rTPtllkivPsQv0i_JA1E3Jf9FvjiCoCwyWJkbR-IgSsVKDOXMtpICRPga8rzHZaMrD9oM0vrLUe5KE1GqBFVbqRqKEWHizzVTCUYGmeW8quNQ3cOwBi3JhCJW_2y_nnTqEcI23E-V167ncZLbECLLMQjkK6I2JR45AIaj5cQPpF6Z_hruqE5pkvhF8ZqcLqBQhKIApoHCTgNDVZ',
      time: '12 hours ago',
      game: 'Fortnite',
      content: 'Victory Royale with the most ridiculous loadout ever! Sometimes luck is a skill too 😂 #Fortnite #VictoryRoyale',
      media: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      likes: '18.7k',
      comments: 2341,
      shares: 1567,
      reactions: [
        { type: 'Lucky', count: '18.7k', icon: 'casino' },
        { type: 'Funny', count: '9.3k', icon: 'sentiment_very_satisfied' },
        { type: 'Wild', count: '6.2k', icon: 'whatshot' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
     

      {/* Add Material Symbols stylesheet */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
        rel="stylesheet" 
      />
       
      {/* Gaming Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10">
        
        {/* Top Navigation Bar - Fixed */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-gray-900/80 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-white">
            <button className="lg:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="flex items-center gap-3 text-white">
              <span className="material-symbols-outlined text-5xl text-purple-500 leading-none">
                hub
              </span>
              <Link to={"/home"}><h2 className="text-white text-2xl font-bold">Virtual World</h2></Link>
            </div>
          </div>
            {/* Back Button */}
  

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
            {/* Notification Button */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex items-center justify-center rounded-lg h-10 w-10 bg-black/40 text-white/80 hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <div className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                3
              </div>
            </button>
{/*             
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-black/40 text-white/80 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">mail</span>
            </button>//// */}
            
            <div 
              className="ml-2 bg-cover rounded-full size-10 border-2 border-purple-500 cursor-pointer"
              style={{ backgroundImage: 'url("data")' }}
              onClick={() => navigate('/user-profile')}
            />
          </div>
        </header>

        {/* Notification Sidebar */}
        {showNotifications && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowNotifications(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-gray-900 border-l border-gray-700 z-50 transform transition-transform duration-300 ease-in-out">
              {/* Render Notification component as sidebar */}
              <Notifications
                isSidebar={true}
                onClose={() => setShowNotifications(false)}
              />
            </div>
          </>
        )}

        {/* Main Content Grid - Added top padding for fixed header */}
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 pt-20">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Sidebar - Fixed */}
            <aside className="col-span-12 lg:col-span-3">
              <div className="flex flex-col rounded-xl bg-gray-800/80 backdrop-blur-sm p-4 space-y-6 sticky top-20 h-fit">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="bg-cover rounded-full size-16"
                      style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMrjMtDQj-lANYcOPYEzZbmhLxNdrUCzNoHK_7G_ZLF8GUqktcYql1Al9_2jsclYlNQ8pWH0vT9rH1_tKKM6d4SX6_nfcFsA7LXpUPHXdbYAKw06WhzZ4dKct6XJVg3l1G_orHzx5DK0ik_R9LCagIq2qKErc2K708MTlNwJ_cDb6LZHWcnmDNehhg1x__mmSNYombHkmkgm-Jwi_HPpeFjaAdYyDf4Z3IX0LP2HBp1VVAIpW05IkoYtg1d0jGTJkKrTVlUlUe_5OH")' }}
                    />
                    <div className="flex flex-col">
                      <h1 className="text-white text-lg font-bold">GamerUsername</h1>
                      <p className="text-gray-400 text-sm">Level 12</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <p className="text-white text-sm font-medium">XP</p>
                    <div className="rounded-full bg-gray-700 h-2">
                      <div className="h-full rounded-full bg-purple-500" style={{ width: '75%' }}/>
                    </div>
                    <p className="text-gray-400 text-xs">3,450 / 5,000 XP</p>
                  </div>

                  {/* Navigation Menu */}
                  <nav className="flex flex-col gap-2 pt-2">
                    {[
                      { icon: 'home', label: 'Home', active: true, path: '/userhome' },
                      { icon: 'newspaper', label: 'My Feed', active: false, path: '/myfeed' },
                      { icon: 'explore', label: 'Explore', active: false, path: '/explore' },
                      { icon: 'trophy', label: 'Tournaments', active: false, path: '/tournaments' },
                      { icon: 'groups', label: 'Groups', active: false, path: '/groups' },
                      { icon: 'group', label: 'Friends', active: false, path: '/friends' },
                      { icon: 'bookmark', label: 'Saved Posts', active: false, path: '/saved' },
                      { icon: 'settings', label: 'Settings', active: false, path: '/settings' },
                      { icon: 'help', label: 'Help & Support', active: false, path: '/help' },
                      { icon: 'logout', label: 'Logout', active: false, path: '/logout' }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left ${
                          item.active 
                            ? 'bg-purple-500/30 text-white' 
                            : 'hover:bg-white/10 text-gray-300'
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                        <p className="text-sm font-medium">{item.label}</p>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Center Column (Main Feed) */}
            <div className="col-span-12 lg:col-span-6">
              {/* Fixed Create Post Section */}
              <div className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl sticky top-20 z-10 mb-6">
                <div className="flex flex-col w-full">
                  <div className="flex w-full items-stretch rounded-lg">
                    <div className="flex justify-end pt-3 pr-2">
                      <div 
                        className="bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjY4ltmYF8qck67yeg5fuRHxWyt4cwFUGmvMbZUMxI1rK0LxHm2Yt_RWfB4LybWDFDIXOQd7ZegOGDtKkZdF3pgK3mLzK4NUb3W45IJJIzErMbXuC9EUZspTVWXRTygwDda4b5jxZG8dZcvbfZyi7nFVPjEQC-TsnRtnAa1HFvdHchw771EbgyJVdd6H3J3zecnXu_o5nkn8xpKtBxG1B2FcFuRuW_2l-pHU8WnaOPfrtAxeZqS-jyyXTIrW3aw-gSddpu5yOfusiQ")' }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <textarea 
                        className="flex w-full resize-none rounded-t-lg text-white bg-gray-700/50 border border-gray-600 placeholder:text-gray-400 pl-4 pt-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Share your latest gaming clips..."
                        rows="3"
                      />
                      <div className="flex border border-gray-600 bg-gray-700/50 justify-between items-center pr-4 rounded-b-lg border-t-0 pl-4 py-2">
                        <div className="flex items-center gap-1">
                          <button className="flex items-center justify-center p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                            <span className="material-symbols-outlined text-xl">image</span>
                          </button>
                          <button className="flex items-center justify-center p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                            <span className="material-symbols-outlined text-xl">videocam</span>
                          </button>
                          <button className="flex items-center justify-center p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                            <span className="material-symbols-outlined text-xl">sell</span>
                          </button>
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

              {/* Fixed Tabs */}
              <div className="pb-3 sticky top-40 bg-gray-900/80 backdrop-blur-sm z-10 mb-6">
                <div className="flex border-b border-white/10 gap-8 overflow-x-auto">
                  {['following', 'trending', 'newest'].map((tab) => (
                    <button
                      key={tab}
                      className={`pb-3 pt-2 whitespace-nowrap border-b-2 transition-colors ${
                        tab === 'following' 
                          ? 'border-purple-500 text-white' 
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      <p className="text-sm font-bold capitalize">
                        {tab}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Independent Scrollable Posts Container */}
              <div 
                className="max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800 hover:overflow-y-auto"
                style={{ 
                  scrollBehavior: 'smooth',
                  overscrollBehavior: 'contain'
                }}
              >
                <div className="space-y-6">
                  {samplePosts.map((post) => (
                    <div key={post.id} className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="bg-cover rounded-full size-12"
                            style={{ backgroundImage: `url('${post.avatar}')` }}
                          />
                          <div>
                            <p className="font-bold text-white">{post.user}</p>
                            <p className="text-xs text-gray-400">{post.time} &middot; In <span className="font-semibold text-purple-400">{post.game}</span></p>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-300">{post.content}</p>
                      </div>
                      <div className="bg-black aspect-video">
                        <img 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                          alt="Gaming clip"
                          src={post.media} 
                        />
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {post.reactions.map((reaction, index) => (
                            <button key={index} className="px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold bg-gray-700 text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 transition-colors">
                              <span className="material-symbols-outlined text-base">{reaction.icon}</span>
                              {reaction.type} <span className="text-purple-400">{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                          <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-xl">chat_bubble_outline</span>
                            <span className="text-sm">{post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1.5 hover:text-green-400 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-xl">share</span>
                            <span className="text-sm">{post.shares}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Fixed */}
            <aside className="col-span-12 lg:col-span-3">
              <div className="space-y-6 sticky top-20 h-fit">
                {/* Online Friends */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold text-white mb-4">Online Friends</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'xShadow', status: 'Playing Valorant', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsxhDWbn1PYUcBXn5sRqjHtN7RNU-d-AdzY3dABS1_eHKrx498rN1mbwcCEfaFiZoROpP6da1oxJNxm_b9sX9qi-EqYi1gYNHlnVFvkO776yxRebrOZG4_z0U0PsP_F0TCwaMfT-wuMajGRRLPIeWrZfT1sxzopu1UrgIymf72XLvMf8RwVxedhXuMAGoFUfK-91EWwNVCraHM3GY6f1hcgE17HFoXo--fWzuxdpi04L5aDnRy3FfUMdzc3hfO1v51Vex8cXn8r2Kp' },
                      { name: 'LunaRay', status: 'Playing Apex Legends', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ81XyOPSMVcMhs7hkzhh1OP3lVLAyiM4NedU0tkgo7gVZlTdJSB4Nz7Qg6yx9DHFLukoXnco_PNte1bWVxNDiH13YKLSf0VWxYwWc1W0foMWjmWf4Xkl2nr1NTSq18jrlfE7dswZdisfD63J8-noDA45sFDrneYfn0crrbIjIChlvAw-0mYhmRv_oO3Ll64RzjyEAMdFMchmrcinCnrG0nM-9tbi19Eaxb7F7mLe0Q6hymr86yQcw_l0DSDdvpjStbX2cCZkQYKlJ' }
                    ].map((friend, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div 
                              className="bg-cover rounded-full size-10"
                              style={{ backgroundImage: `url('${friend.avatar}')` }}
                            />
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-gray-800"></span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-white">{friend.name}</p>
                            <p className="text-xs text-gray-400">{friend.status}</p>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-xl text-gray-400 hover:text-white cursor-pointer">more_vert</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Tournaments */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold text-white mb-4">Live Tournaments</h3>
                  <div className="space-y-3">
                    <div className="bg-black/40 p-3 rounded-lg flex items-center gap-4 hover:bg-purple-500/10 transition-colors cursor-pointer">
                      <img 
                        className="w-16 h-16 object-cover rounded" 
                        alt="Valorant tournament"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq8LgfEZn2flI93h4ROe23DHeBg7ImDjoEJ_hZbEjwgiyBqdFrprtKmtcV3asSnUbqvQnaq21FHPi3X2MTEIhhpXdwa5_j5l_PSCjKh3uGCQyEZ3MmEbR5O99ba1ITDuC5BrUVV_kZZAB3oUXb-aG-WXh86A_MV-vI4uCg211yoIaoaWV614DsjNgq-uw4H6fN4llJLCA_7ApidkmXUbfhcrXIF8givQOAWBOuQQ2KzYWU4yTeRehXhUUx46zaS2QAc8K3_4ubght5" 
                      />
                      <div>
                        <p className="font-semibold text-sm text-white">Valorant Champions Tour</p>
                        <p className="text-xs text-purple-400">Prize: $1,000,000</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creator Spotlight */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold text-white mb-4">Creator Spotlight</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIsweGKG2fBIIM_haiWr6dISPPlvlyZVSz8EGPPhUiu48IbBfixUY9cgbO5e8U6rTPtllkivPsQv0i_JA1E3Jf9FvjiCoCwyWJkbR-IgSsVKDOXMtpICRPga8rzHZaMrD9oM0vrLUe5KE1GqBFVbqRqKEWHizzVTCUYGmeW8quNQ3cOwBi3JhCJW_2y_nnTqEcI23E-V167ncZLbECLLMQjkK6I2JR45AIaj5cQPpF6Z_hruqE5pkvhF8ZqcLqBQhKIApoHCTgNDVZ")' }}
                      />
                      <div>
                        <p className="font-semibold text-sm text-white">StreamGod</p>
                        <p className="text-xs text-gray-400">1.2M Followers</p>
                      </div>
                      <button className="ml-auto px-3 py-1 text-xs font-bold bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-purple-600::-webkit-scrollbar-thumb {
          background-color: #9333ea;
          border-radius: 10px;
        }
        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background-color: #1f2937;
        }
        
        /* Prevent body scroll when mouse is over center content */
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default UserHome;