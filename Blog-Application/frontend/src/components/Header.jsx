import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/AuthStore";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // decide profile route based on role
  const getProfilePath = () => {
    if (!user) return "/";

    console.log("current user", user);
    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  return (
    <nav className='w-full'>
      <div className='flex justify-between bg-[#0ea06f] text-white p-3'>
        {/* Logo */}
        <div>
            <img className='w-8 rounded-full h-8 sm:w-12.5 sm:h-12.5 object-cover ' src="data:image/png;base64,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" alt="" />
        </div>

        <ul className={navLinksClass}>
          {/* Always visible */}
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
              Home
            </NavLink>
          </li>

          {/* Not logged in */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* Logged in */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to={getProfilePath()}
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  Profile
                </NavLink>
              </li>

              <li>
                <button className={navLinkClass} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;