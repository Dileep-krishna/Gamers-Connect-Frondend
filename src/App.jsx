import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// User pages
import Home from "./pages/user/Home";
import UserHome from "./pages/user/UserHome";
import About from "./pages/About";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Landing from "./pages/Landing";
import MyFeed from "./pages/user/Userhomepage/MyFeed";
import Explore from "./pages/user/Userhomepage/Explore";
import Saved from "./pages/user/Userhomepage/Saved";
import Settings from "./pages/user/Userhomepage/Settings";
import Help from "./pages/user/Userhomepage/Help";
import Logout from "./pages/user/Userhomepage/Logout";
import ProfileEdit from "./pages/ProfileEdit";
import AdminDashboard from "./components/adminpage/AdminDashboard";
import AdminUserManagement from "./components/adminpage/AdminUserManagement";
// import TournamentManagement from "./components/adminpage/TournamentManagement";
import GroupManagement from "./components/adminpage/GroupManagement";
import ContentModeration from "./components/adminpage/ContentModeration";
import AdminProfileEdit from "./components/adminpage/AdminProfileEdit";
import CreatePost from "./pages/user/Userhomepage/CreatePost";
import { ToastContainer } from "react-toastify";
// import AdminTurnamentCreate from "./components/adminpage/AdminTurnamentCreate";

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
        <Route path="/profile-edit" element={<AdminProfileEdit />} />

        <Route path="/admin-user" element={<AdminUserManagement />} />
        {/* <Route path="/admin-tour" element={<TournamentManagement />} /> */}
        <Route path="/admin-group" element={<GroupManagement />} />
        <Route path="/admin-content" element={<ContentModeration />} />
        {/* <Route path="/admin-create-tour" element={<AdminTurnamentCreate />} /> */}
        {/* User Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/user-profile" element={<ProfileEdit />} />
        <Route path="/myfeed" element={<MyFeed />} /> {/* Add this route */}
        <Route path="/explore" element={<Explore />} /> {/* Add this route */}
        {/* Add this route */}
        <Route path="/settings" element={<Settings />} /> {/* Add this route */}
        <Route path="/saved" element={<Saved />} /> {/* Add this route */}
        <Route path="/help" element={<Help />} /> {/* Add this route */}
        <Route path="/logout" element={<Logout />} /> {/* Add this route */}
        <Route path="/notifications" element={<Notification />} /> {/* Add this route */}
        <Route path="/create-post" element={<CreatePost/>} /> {/* Add this route */}
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
              <h1 className="text-2xl text-red-500">404 - Page Not Found</h1>
            </div>
          }
        />
  
      </Routes>
            <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        
        />
    </Router>
    
  );
}

export default App;
