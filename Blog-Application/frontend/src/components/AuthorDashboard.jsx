import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/useAuth";

function AuthorDashboard() {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useAuth((state) => state.currentUser);

  useEffect(() => {

    if (!currentUser) return;   

    const getArticles = async () => {
      try {

        const res = await axios.get(
          `http://localhost:4000/author-api/articles/${currentUser._id}`,
          { withCredentials: true }
        );

        setArticles(res.data.payload);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getArticles();

  }, [currentUser]);

  if (!currentUser) {
    return <p className="text-center mt-10">Loading user...</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading articles...</p>;
  }

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Welcome {currentUser.firstName}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {articles.map((article) => (

          <div key={article._id} className="bg-gray-100 p-6 rounded-xl">

            <h2 className="text-xl font-semibold">
              {article.title}
            </h2>

            <p className="text-gray-600">
              {article.category}
            </p>

            <p className="text-sm text-gray-500">
              {article.content}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AuthorDashboard;