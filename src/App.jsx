import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// User pages
import Home from "./pages/user/Home";
import UserHome from "./pages/user/UserHome";
import MyFeed from "./pages/user/Userhomepage/MyFeed";
import Explore from "./pages/user/Userhomepage/Explore";
import Saved from "./pages/user/Userhomepage/Saved";
import Settings from "./pages/user/Userhomepage/Settings";
import Help from "./pages/user/Userhomepage/Help";
import Logout from "./pages/user/Userhomepage/Logout";
import Friends from "./pages/user/Userhomepage/Friends";
import CreatePost from "./pages/user/Userhomepage/CreatePost";
import UserFeed from "./pages/user/Userhomepage/UserFeed";



// Static pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Features from "./pages/Features";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Profile
import ProfileEdit from "./pages/ProfileEdit";

// Admin pages
import AdminDashboard from "./components/adminpage/AdminDashboard";
import AdminUserManagement from "./components/adminpage/AdminUserManagement";
import GroupManagement from "./components/adminpage/GroupManagement";
import ContentModeration from "./components/adminpage/ContentModeration";
import AdminProfileEdit from "./components/adminpage/AdminProfileEdit";
import AdminFeedback from "./components/adminpage/AdminFeedback";
import FollowersFollowing from "./pages/user/FollowersFollowing";
import Followers from "./pages/user/Followers";



function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-user" element={<AdminUserManagement />} />
        <Route path="/admin-group" element={<GroupManagement />} />
        <Route path="/admin-content" element={<ContentModeration />} />
        <Route path="/admin-profile-edit" element={<AdminProfileEdit />} />
        <Route path="/admin-feedback" element={<AdminFeedback />} />

        {/* User */}
        <Route path="/home" element={<Home />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/user-profile" element={<ProfileEdit />} />
        <Route path="/myfeed" element={<MyFeed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/friends" element={<Friends />} />
 <Route path="/followers/:userId" element={<Followers />} />
        <Route path="/following/:userId" element={<FollowersFollowing />} />
        <Route path="/userfeed/:userId" element={<UserFeed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logout />} />

        {/* Static */}
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
              <h1 className="text-2xl text-red-500">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
    </Router>
  );
}

export default App;
