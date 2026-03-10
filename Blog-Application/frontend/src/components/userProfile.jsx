import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router";
import { primaryBtn } from "../styles/common.js";
import { toast } from "react-hot-toast";

function UserProfile() {

  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const onLogout = async () => {

    await logout();

    toast.success("Logged out successfully 👋");

    navigate("/");
  };

  return (
    <div className="p-10">

      <button onClick={onLogout} className={primaryBtn}>
        Logout
      </button>

    </div>
  );
}

export default UserProfile;