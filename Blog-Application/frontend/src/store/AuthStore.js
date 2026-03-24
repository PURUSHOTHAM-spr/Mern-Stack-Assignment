import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  // LOGIN
  login: async (userCredWithRole) => {
    const { role, ...userCredObj } = userCredWithRole;

    try {
      set({ loading: true, error: null });

      const res = await axios.post(
        "http://localhost:4000/common-api/login",
        userCredObj,
        { withCredentials: true }
      );

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
      });

    } catch (err) {
      console.log("Login error:", err);

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      set({ loading: true, error: null });

      await axios.get(
        "http://localhost:4000/common-api/logout",
        { withCredentials: true }
      );

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });

    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Logout failed",
      });
    }
  },

  // CHECK AUTH (restore session)
  checkAuth: async () => {
    try {
      set({ loading: true });

      const res = await axios.get(
        "http://localhost:4000/common-api/check-auth",
        { withCredentials: true }
      );

      set({
        loading: false,
        currentUser: res.data.payload,
        isAuthenticated: true,
      });

    } catch (err) {

      if (err.response?.status === 401) {
        set({
          loading: false,
          currentUser: null,
          isAuthenticated: false,
        });
        return;
      }

      console.error("Auth check failed:", err);

      set({
        loading: false,
        currentUser: null,
        isAuthenticated: false,
      });
    }
  },
}));