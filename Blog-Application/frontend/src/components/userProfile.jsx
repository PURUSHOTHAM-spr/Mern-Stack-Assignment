import { useAuth } from "../store/AuthStore.js";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
} from "../styles/common.js";

function UserProfile() {
  const user = useAuth((state) => state.currentUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = activeTab === "following" 
          ? "http://localhost:4000/user-api/articles/following" 
          : "http://localhost:4000/user-api/articles";
        const res = await axios.get(endpoint, { withCredentials: true });
        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [activeTab]);

  const handleFollowToggle = async (e, articleObj) => {
    e.stopPropagation();
    if (!user) return toast.error("Please login to follow authors");
    const myId = user._id || user.userId;
    if (articleObj.author._id === myId) return toast.error("You cannot follow yourself");

    const isFollowing = articleObj.author?.followers?.includes(myId);

    try {
      if (isFollowing) {
        await axios.put(`http://localhost:4000/user-api/users/${articleObj.author._id}/unfollow`, {}, { withCredentials: true });
        // Optimistic update
        setArticles(prev => prev.map(a => {
          if (a.author._id === articleObj.author._id) {
            return { ...a, author: { ...a.author, followers: a.author.followers.filter(id => id !== myId) } };
          }
          return a;
        }));
      } else {
        await axios.put(`http://localhost:4000/user-api/users/${articleObj.author._id}/follow`, {}, { withCredentials: true });
        setArticles(prev => prev.map(a => {
          if (a.author._id === articleObj.author._id) {
            return { ...a, author: { ...a.author, followers: [...(a.author.followers || []), myId] } };
          }
          return a;
        }));
      }
    } catch (err) {
      console.error("Failed to follow/unfollow:", err);
      toast.error(err.response?.data?.message || "Failed to update follow status");
    }
  };

  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mt-6 mb-4">Articles</h1>
      
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6 pb-2">
        <button 
          onClick={() => setActiveTab("all")}
          className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === "all" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"}`}
        >
          All Articles
        </button>
        <button 
          onClick={() => setActiveTab("following")}
          className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === "following" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"}`}
        >
          Following
        </button>
      </div>

      {loading ? (
        <p className={loadingClass}>Loading articles...</p>
      ) : error ? (
        <p className={errorClass}>{error}</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500 italic py-8">No articles found in this section.</p>
      ) : (
        <div className={articleGrid}>
          {articles.map((articleObj) => {
            const myId = user?._id || user?.userId;
            const isFollowing = articleObj.author?.followers?.includes(myId);
            const isOwnPost = articleObj.author?._id === myId;

            return (
              <div className={articleCardClass} key={articleObj._id}>
                <div className="flex flex-col p-6 h-full bg-white rounded-lg shadow border border-gray-100 hover:shadow-lg transition-all">
                  
                  {/* Author Header */}
                  {articleObj.author && (
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <img 
                          src={articleObj.author.profileImageUrl || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} 
                          alt="Author" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-semibold text-gray-800 text-sm">
                          {articleObj.author.firstName} {articleObj.author.lastName || ''}
                        </span>
                      </div>
                      {!isOwnPost && (
                        <button 
                          onClick={(e) => handleFollowToggle(e, articleObj)}
                          className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                            isFollowing ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          }`}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Top Content */}
                  <div className="flex-1">
                    <p className={articleTitle}>{articleObj.title}</p>
                    <p className="text-gray-600 text-sm mb-3">{articleObj.content.slice(0, 80)}...</p>
                    <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
                  </div>

                  {/* Button at bottom */}
                  <button className={`${ghostBtn} mt-4 w-full`} onClick={() => navigateToArticleByID(articleObj)}>
                    Read Article
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserProfile;