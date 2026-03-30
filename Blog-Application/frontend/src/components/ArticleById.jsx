import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/AuthStore";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (article?.author?.followers && user) {
      const myId = user._id || user.userId;
      setIsFollowing(article.author.followers.includes(myId));
    }
  }, [article, user]);

  useEffect(() => {
    const getArticle = async () => {
      if (!article) setLoading(true);

      try {
        const res = await axios.get(`http://localhost:4000/user-api/articles/${id}`, { withCredentials: true });

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete article
  const deleteArticle = async () => {
    try {
      await axios.patch(`http://localhost:4000/author-api/articles/${id}/status`, { isArticleActive: false }, { withCredentials: true });

      navigate("/author-profile");
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const handleFollowToggle = async () => {
    if (!user) return alert("Please login to follow authors");
    const myId = user._id || user.userId;
    if (article.author._id === myId) return alert("You cannot follow yourself");

    try {
      if (isFollowing) {
        await axios.put(`http://localhost:4000/user-api/users/${article.author._id}/unfollow`, {}, { withCredentials: true });
        setIsFollowing(false);
        // Optimistically update article followers
        setArticle(prev => ({
          ...prev, author: { ...prev.author, followers: prev.author.followers.filter(id => id !== myId) }
        }));
      } else {
        await axios.put(`http://localhost:4000/user-api/users/${article.author._id}/follow`, {}, { withCredentials: true });
        setIsFollowing(true);
        // Optimistically update article followers
        setArticle(prev => ({
          ...prev, author: { ...prev.author, followers: [...(prev.author.followers || []), myId] }
        }));
      }
    } catch (err) {
      console.error("Failed to follow/unfollow:", err);
      setError(err.response?.data?.message || "Failed to update follow status");
    }
  };

  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.put(
        "http://localhost:4000/user-api/articles",
        {
          user: user?._id || user?.userId, 
          articleId: article._id,
          comment: newComment,
          rating: rating,
        },
        { withCredentials: true }
      );
      
      // Update local state with the new article that has the new comment
      setArticle(res.data.payload);
      setNewComment("");
      setRating(5);
    } catch (err) {
      console.error("Failed to add comment:", err);
      setError(err.response?.data?.message || "Failed to add comment");
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className="flex items-center gap-4">
            <div className={authorInfo}>Author: {article.author?.firstName || "Author"}</div>
            {user && (!article.author?._id || article.author._id !== (user?._id || user?.userId)) && (
              <button 
                onClick={handleFollowToggle}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  isFollowing ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={deleteArticle}>
            Delete
          </button>
        </div>
      )}

      {/* Comment Section */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        
        {/* Comment Form */}
        {user ? (
          <form onSubmit={addComment} className="mb-6 p-4 border rounded-md bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl leading-none focus:outline-none transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className="w-full border rounded-md p-3 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newComment.trim()}
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mb-6 text-gray-500 italic">Please login to add a comment.</p>
        )}

        {/* Display Comments */}
        <div className="space-y-4">
          {article.comments && article.comments.length > 0 ? (
            article.comments.map((c, index) => (
              <div key={c._id || index} className="flex gap-4 p-4 border rounded-md bg-gray-50 flex-col sm:flex-row">
                {c.user && (
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={c.user?.profileImageUrl || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} 
                      alt={c.user?.firstName || "User avatar"}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-900">
                      {c.user?.firstName ? `${c.user.firstName} ${c.user.lastName || ''}`.trim() : "Unknown User"}
                    </h4>
                    {c.createdAt && (
                      <span className="text-xs text-gray-500">
                        {new Date(c.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    )}
                  </div>
                  {c.rating && (
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-lg leading-none ${star <= c.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 text-gray-800 whitespace-pre-wrap word-break break-words bg-white p-3 rounded-md border text-sm">{c.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;