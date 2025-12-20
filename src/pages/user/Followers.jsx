// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { adminUsersAPI } from "../../services/allAPI";
// import SERVERURL from "../../services/serverURL";

// const Followers = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();

//   const [followersList, setFollowersList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     async function fetchFollowers() {
//       try {
//         const users = await adminUsersAPI();
//         const currentUser = users.find((u) => u._id === userId);
//         setUser(currentUser);
//         if (!currentUser) {
//           setFollowersList([]);
//           setLoading(false);
//           return;
//         }
//         const followerIds = currentUser.followers || [];
//         const followers = users.filter((u) => followerIds.includes(u._id));
//         setFollowersList(followers);
//       } catch (error) {
//         console.error("Error fetching followers:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchFollowers();
//   }, [userId]);

//   if (loading) return <p className="text-center mt-10">Loading followers...</p>;

//   if (!user) return <p className="text-center mt-10">User not found.</p>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6 max-w-3xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 px-4 py-2 bg-purple-700 rounded-full hover:bg-purple-800"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold mb-6 text-center">
//         {user.username}'s Followers
//       </h1>

//       {followersList.length === 0 ? (
//         <p className="text-center text-gray-400">No followers found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {followersList.map((follower) => (
//             <li
//               key={follower._id}
//               className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition"
//             >
//               <img
//                 src={
//                   follower.profile
//                     ? `${SERVERURL}/imguploads/${follower.profile}`
//                     : "https://i.pravatar.cc/150"
//                 }
//                 alt={follower.username}
//                 className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
//               />
//               <div>
//                 <p className="text-lg font-semibold">{follower.username}</p>
//                 <p className="text-gray-400 text-sm">{follower.bio || "Gamer"}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Followers;
import React from 'react'

function Followers() {
  return (
    <div>
      
    </div>
  )
}

export default Followers
