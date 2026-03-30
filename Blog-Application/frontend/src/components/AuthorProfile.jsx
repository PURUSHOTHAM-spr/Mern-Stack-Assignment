import { NavLink, Outlet } from "react-router";
import {
  pageWrapper,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
  divider,
} from "../styles/common";
import { useAuth } from "../store/AuthStore";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

function AuthorProfile() {
  const user = useAuth((state) => state.currentUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className={pageWrapper}>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.firstName || "Author"}</h1>

      <div className="flex items-center gap-4 mb-6">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-16 h-16 rounded-lg object-cover border-2 border-gray-300"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-600">
            {user?.firstName?.charAt(0)?.toUpperCase() || "A"}
          </div>
        )}
        <div>
          <div className="flex items-center gap-3">
            <p className="text-lg font-medium">{user?.firstName} {user?.lastName}</p>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors rounded-full flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          </div>
          <p className="text-sm text-gray-500">{user?.email}</p>
          {/* followers */}
        </div>
      </div>
      {/* Author Navigation */}
      <div className="flex gap-6 mb-6">

        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Write Article
        </NavLink>

        <NavLink
          to="earnings"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Earnings
        </NavLink>

        <NavLink
          to="stats"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Stats
        </NavLink>

      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
}

export default AuthorProfile;