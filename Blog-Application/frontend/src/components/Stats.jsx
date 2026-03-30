import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stats() {
  const [stats, setStats] = useState({ followers: 0, posts: 0, rating: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:4000/author-api/stats", { withCredentials: true });
        setStats(res.data.payload);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading stats...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="py-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">Author Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Followers Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-lg">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Followers</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.followers}</p>
        </div>

        {/* Posts Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-lg">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" /></svg>
          </div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Published Posts</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.posts}</p>
        </div>

        {/* Rating Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-lg">
          <div className="p-3 bg-yellow-50 text-yellow-500 rounded-full mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          </div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Avg Rating</h3>
          <div className="flex items-end gap-1 mt-2">
            <p className="text-3xl font-bold text-gray-900">{stats.rating}</p>
            <p className="text-gray-500 font-medium mb-1">/ 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;