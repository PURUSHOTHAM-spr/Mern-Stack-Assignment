import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  pageBackground,
  pageWrapper,
  section,
  cardClass,
  pageTitleClass,
  headingClass,
  subHeadingClass,
  bodyText,
  mutedText,
  linkClass,
  primaryBtn,
  secondaryBtn,
  ghostBtn,
  formCard,
  formTitle,
  labelClass,
  inputClass,
  formGroup,
  submitBtn,
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  articleBody,
  timestampClass,
  tagClass,
  errorClass,
  successClass,
  loadingClass,
  emptyStateClass,
  divider
} from "../styles/common.js";

function UserDashboard() {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch articles when page loads
  useEffect(() => {

    const getArticles = async () => {
      try {

        const res = await axios.get(
          "http://localhost:4000/user-api/articles",
          { withCredentials: true }
        );

        console.log(res.data);

        setArticles(res.data.payload);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getArticles();

  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading articles...</p>;
  }

  return (
    <div className="p-10">

  
      <h1 className={pageTitleClass}>
        Articles
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 m-8 p-8 lg:grid-cols-3 gap-7 bg-[#e8e8ed] border border-[#e8e8ed] rounded-xl overflow-hidden'>

        {articles.map((article) => (

          <div
            key={article._id}
            className="bg-gray-100 p-6 rounded-xl hover:bg-gray-200 transition"
          >

            <h2 className="text-xl font-semibold mb-2">
              {article.title}
            </h2>

            <p className="text-gray-600 mb-3">
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

export default UserDashboard;