import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminUsersAPI } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

const FollowersFollowing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await adminUsersAPI();
        const currentUser = users.find((u) => u._id === userId);
        setUser(currentUser);
        if (!currentUser) {
          setFollowersList([]);
          setFollowingList([]);
          setLoading(false);
          return;
        }
        const followerIds = currentUser.followers || [];
        const followingIds = currentUser.following || [];

        const followers = users.filter((u) => followerIds.includes(u._id));
        const following = users.filter((u) => followingIds.includes(u._id));

        setFollowersList(followers);
        setFollowingList(following);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (!user) return <p className="text-center mt-10 text-red-400">User not found.</p>;

  // Handler to navigate to user feed when clicking on user item
  const handleUserClick = (clickedUserId) => {
    navigate(`/userfeed/${clickedUserId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-purple-700 rounded-full hover:bg-purple-800"
      >
        ← Back
      </button>

      <h1 className="text-center text-3xl font-bold mb-6">
        {user.username}'s Followers & Following
      </h1>

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-700"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* Followers panel */}
        <section className="min-w-full snap-start p-4">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">Followers ({followersList.length})</h2>

          {followersList.length === 0 ? (
            <p className="text-gray-400">No followers found.</p>
          ) : (
            <ul className="space-y-4">
              {followersList.map((follower) => (
                <li
                  key={follower._id}
                  onClick={() => handleUserClick(follower._id)}
                  className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-pink-500 transition cursor-pointer"
                  title={`Go to ${follower.username}'s feed`}
                >
                  <img
                    src={
                      follower.profile
                        ? `${SERVERURL}/imguploads/${follower.profile}`
                        : "https://i.pravatar.cc/150"
                    }
                    alt={follower.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                  />
                  <div>
                    <p className="text-lg font-semibold">{follower.username}</p>
                    <p className="text-gray-400 text-sm">{follower.bio || "Gamer"}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Following panel */}
        <section className="min-w-full snap-start p-4 border-l border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Following ({followingList.length})</h2>

          {followingList.length === 0 ? (
            <p className="text-gray-400">Not following anyone yet.</p>
          ) : (
            <ul className="space-y-4">
              {followingList.map((followed) => (
                <li
                  key={followed._id}
                  onClick={() => handleUserClick(followed._id)}
                  className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition cursor-pointer"
                  title={`Go to ${followed.username}'s feed`}
                >
                  <img
                    src={
                      followed.profile
                        ? `${SERVERURL}/imguploads/${followed.profile}`
                        : "https://i.pravatar.cc/150"
                    }
                    alt={followed.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div>
                    <p className="text-lg font-semibold">{followed.username}</p>
                    <p className="text-gray-400 text-sm">{followed.bio || "Gamer"}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Pagination indicator dots */}
      <div className="flex justify-center mt-6 space-x-2">
        <Dot scrollContainerRef={scrollContainerRef} index={0} />
        <Dot scrollContainerRef={scrollContainerRef} index={1} />
      </div>
    </div>
  );
};

// Helper component for page indicator dots
const Dot = ({ scrollContainerRef, index }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!scrollContainerRef.current) return;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const page = Math.round(scrollLeft / width);
      setActive(page === index);
    };

    const el = scrollContainerRef.current;
    el?.addEventListener("scroll", onScroll);

    // Initial check
    onScroll();

    return () => {
      el?.removeEventListener("scroll", onScroll);
    };
  }, [scrollContainerRef, index]);

  const handleClick = () => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: index * width,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`w-3 h-3 rounded-full transition-colors ${
        active ? "bg-purple-500" : "bg-gray-600"
      }`}
      aria-label={`Scroll to panel ${index + 1}`}
    />
  );
};

export default FollowersFollowing;
